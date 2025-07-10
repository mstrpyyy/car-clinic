import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'Tickets'
}

export default function Tickets() {
  return (
    <Link href={'/dashboard/tickets/form?t=1'}>Tickets</Link>
  )
}
