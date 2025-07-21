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
  const { search } = await searchParams

    if (!search) return <CustomerSearch />

    const results = await getCustomerBySearch(search)

    return (
        <>
            <CustomerSearch />
            {results.length ? <CustomerTable data={results} /> : (
                <p className="mt-4">No results found</p>
            )}
        </>
    )
}
