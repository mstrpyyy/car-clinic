import { getCustomerById } from "@/domain/customer/service"
import * as Sentry from "@sentry/nextjs"
import { BackButton } from "../_components/back-button"
import { getTicketById } from "@/domain/ticket/service"

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
      const customer = await getCustomerById(+customerId)

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

      // return ticket form 
      console.log(customer)
    }

    // Edit ticket form 
    if (ticketId) {
      const ticket = await getTicketById(+ticketId)

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      const customer = await getCustomerById(ticket.customerId)

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