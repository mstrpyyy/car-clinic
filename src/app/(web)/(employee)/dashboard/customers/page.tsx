import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'Costumers'
}

export default function Costumers() {
  return (
    <Link href={'/dashboard/customers/form?c=1'}>Costumers</Link>
  )
}
