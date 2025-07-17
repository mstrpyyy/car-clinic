import { getOpenTickets, getTicketBySearch } from "@/domain/ticket/service"
import TicketSearch from "./ticketSearch"
import TicketTable from "./ticketTable"


export const metadata = {
    title: "Ticket Search",
}

export default async function Tickets({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { search } = await searchParams

    if (!search) {
        const results = await getOpenTickets()
        return (
            <>
                <TicketSearch />
                {results.length ? <TicketTable data={results} /> : <p className="mt-4">No open tickets found</p>}
            </>
        )
    }
    
    const results = await getTicketBySearch(search)

    return (
        <>
            <TicketSearch />
            {results.length ? <TicketTable data={results} /> : <p className="mt-4">No results found</p>}
        </>
    )
}