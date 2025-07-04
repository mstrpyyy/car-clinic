import React from 'react'

type ContentWrapper = {
  children: React.ReactNode
  className?: string
}

export const ContentWrapper:React.FC<ContentWrapper> = ({children, className}) => {
  return (
    <div className={`w-full px-[20px] md:max-w-[748px] lg:max-w-[1004px] xl:max-w-[1240px] mx-auto ${className && className}`}>
      {children}
    </div>
  )
}
