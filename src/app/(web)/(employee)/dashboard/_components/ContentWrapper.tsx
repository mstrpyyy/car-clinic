import React from 'react'

type ContentWrapper = {
  children: React.ReactNode
  className?: string
}

export const ContentWrapper:React.FC<ContentWrapper> = ({children, className}) => {
  return (
    <div className={`w-full max-md:px-[20px] md:max-w-[658px] lg:max-w-[914px] xl:max-w-[1150px] 2xl:max-w-[1400px] py-[20px] mx-auto ${className && className}`}>
      {children}
    </div>
  )
}
