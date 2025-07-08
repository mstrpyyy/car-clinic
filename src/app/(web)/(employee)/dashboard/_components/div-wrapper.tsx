import React from 'react'

type ContentWrapper = {
  children: React.ReactNode
  className?: string
}

export const DivWrapper:React.FC<ContentWrapper> = ({children, className}) => {
  return (
    <div className={` w-full blur-card p-7 ${className}`}>
      {children}
    </div>
  )
}
