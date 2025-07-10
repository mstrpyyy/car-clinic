import * as Sentry from "@sentry/nextjs"
import { BackButton } from "../../_components/back-button"
import { getCustomer } from "@/domain/customer/repository"
import { getTicket } from "@/domain/ticket/repository"
import TicketForm from "./TicketForm"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Users, init } from "@kinde/management-api-js"

type CustomerFormPage = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export async function generateMetadata({ searchParams }: CustomerFormPage) {
  const { c, t } = await searchParams
  return {title: c ? "New ticket" : t ? `Edit ticket #${t}` : 'Ticket Form'}
}



export default async function TicketFormPage({searchParams}:CustomerFormPage) {
    try {
        const { c, t } = await searchParams
        
        if (!c && !t) {
            return (
                <>
                    <h2 className="text-2xl mb-2">Ticket ID or Customer ID required to load ticket form</h2>
                    <BackButton title="Go Back" variant="default" />
                </>
            )
        }

        const { getPermission, getUser } = getKindeServerSession()
        const [managerPermission, user] = await Promise.all([
            getPermission("manager"),
            getUser()
        ])
        const isManager = managerPermission?.isGranted
        const userEmail = user?.email

        // New ticket form 
        if (c) {
            const customer = await getCustomer(parseInt(c))

            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Customer ID #{c} not found</h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                )
            }

            if (!customer.active) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Customer ID #{c} is not active.</h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                )
            }

            // return ticket form 
            if (isManager) {
                init() // initializes the kinde management api
                const { users } = await Users.getUsers()
                const techs = users ? users.map(user => ({ id: user.email!, text: user.email!})) : []
                return <TicketForm customer={customer} techs={techs} />
            } else {
                return <TicketForm customer={customer} userEmail={userEmail!} />
            }
        }

        // Edit ticket form 
        if (t) {
            const ticket = await getTicket(parseInt(t))

            if (!ticket) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Ticket ID #{t} not found</h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                )
            }

            const customer = await getCustomer(ticket.customerId)

            // return ticket form 
           if (isManager) {
                init() // initializes the kinde management api
                const { users } = await Users.getUsers()
                const techs = users ? users.map(user => ({ id: user.email!, text: user.email!})) : []
                return <TicketForm customer={customer} techs={techs} ticket={ticket} />
            } else {
                const isEditable = user?.email?.toLowerCase() === ticket.tech?.toLowerCase()
                return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable} userEmail={userEmail!} />
            }
            
        }

    } catch (e) {
        if (e instanceof Error) {
            Sentry.captureException(e)
            throw e
        }
    }
}