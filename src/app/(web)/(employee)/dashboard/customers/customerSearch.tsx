import Form from "next/form"
import { Input } from "@/components/ui/input"
import SearchButton from "../_components/search-button"

export default function CustomerSearch() {
    return (
        <Form
            action="/dashboard/customers"
            className="flex gap-2 items-center"
        >
            <Input
                name="searchText"
                type="text"
                placeholder="Search Customers"
                className="w-full"
            />
            <SearchButton />
        </Form>
    )
}