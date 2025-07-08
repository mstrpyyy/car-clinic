import React from 'react'

type ContentWrapper = {
  children: React.ReactNode
  className?: string
}

export const ContentWrapper:React.FC<ContentWrapper> = ({children, className}) => {
  return (
    <div className={`w-full text-wrap py-8 ${className}`}>
      {children}
    </div>
  )
}


// sm:max-w-[530px] max-sm:px-[20px] md:max-w-[658px] lg:max-w-[914px] xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto