import Form from "next/form"
import { Input } from "@/components/ui/input"
import SearchButton from "../_components/search-button"

export default function TicketSearch() {
    return (
        <Form
            action="/dashboard/tickets"
            className="flex gap-2 items-center"
        >
            <Input
                name="search"
                type="text"
                placeholder="Search Tickets"
                className="w-full"
            />
            <SearchButton />
        </Form>
    )
}