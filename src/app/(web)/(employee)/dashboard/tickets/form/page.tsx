import * as Sentry from "@sentry/nextjs"
import { BackButton } from "../../_components/back-button"
import { getCustomer } from "@/domain/customer/repository"
import { getTicket } from "@/domain/ticket/repository"
import TicketForm from "./TicketForm"

type CustomerFormPage = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function TicketFormPage({searchParams}:CustomerFormPage) {
  try {
    const { customerId, ticketId } = await searchParams

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">Ticket ID or Customer ID required to load ticket form</h2>
          <BackButton title="Go Back" variant="default" />
        </>
      )
    }

    // New ticket form 
    if (customerId) {
      const customer = await getCustomer(+customerId)

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">Customer ID #{customerId} is not active.</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      <TicketForm customer={customer} />
    }

    // Edit ticket form 
    if (ticketId) {
      const ticket = await getTicket(+ticketId)

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      const customer = await getCustomer(ticket.customerId)

      // return ticket form 
      console.log('ticket: ', ticket)
      console.log('customer: ', customer)

    }

  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e)
      throw e
    }
  }
}