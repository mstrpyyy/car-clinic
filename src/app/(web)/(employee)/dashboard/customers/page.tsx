import React from 'react'
import { getCustomerBySearch } from '@/domain/customer/service'
import CustomerSearch from './customerSearch'
import CustomerTable from './customerTable'

type CustomerSearchProps = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export const metadata = {
    title: "Customer Search",
}

export default async function Costumers({searchParams}:CustomerSearchProps) {
  const { searchText } = await searchParams

    if (!searchText) return <CustomerSearch />

    const results = await getCustomerBySearch(searchText)

    return (
        <>
            <CustomerSearch />
            {results.length ? <CustomerTable data={results} /> : (
                <p className="mt-4">No results found</p>
            )}
        </>
    )
}
