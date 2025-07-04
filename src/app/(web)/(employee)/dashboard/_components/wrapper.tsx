import React from 'react'

type ContentWrapper = {
  children: React.ReactNode
  className?: string
}

export const ContentWrapper:React.FC<ContentWrapper> = ({children, className}) => {
  return (
    <div className={`w-full  overflow-x-hidden text-wrap sm:max-w-[530px] max-sm:px-[20px] md:max-w-[658px] lg:max-w-[914px] xl:max-w-[1150px] 2xl:max-w-[1400px] py-6 mx-auto ${className && className}`}>
      {children}
    </div>
  )
}
