import Link from 'next/link'
import React from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'

type HeaderProps = {
  headingText: string
  returnUrl: string
  returnText: string
}

export const DashboardHeader:React.FC<HeaderProps> = ({headingText, returnUrl, returnText}) => {
  return (
    <header className="h-20">
      <Link href={returnUrl} className="flex items-center gap-2 text-muted-foreground text-sm font-medium hover:underline w-fit">
        <RiArrowLeftLine />
        {returnText}
      </Link>
      <h1 className="text-4xl font-bold content-center">
        {headingText}
      </h1>
  </header>
  )
}
