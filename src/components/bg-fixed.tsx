'use client'


import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type BgFixedProps = {
  imageUrl: string
  imageUrlDark?: string
  className?: string
  objectFit?: 'object-cover' | 'object-contain' | 'object-fill' | 'object-none' | 'object-scale-down'
  objectPosition?: 'object-center' | 'object-top' | 'object-bottom' | 'object-left' | 'object-right' | '50% 50%'
}

export const BgFixed:React.FC<BgFixedProps> = ({imageUrl, imageUrlDark, className, objectFit = 'object-cover', objectPosition = 'object-center'}) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const imageSrc = resolvedTheme === 'dark' && imageUrlDark
  ? imageUrlDark
  : imageUrl
  
  return (
    <div className='fixed top-0 -z-50'>
      <div className='relative w-screen min-h-screen'>
        <Image
          src={imageSrc}
          alt="banner image"
          fill
          sizes="100vw"
          className={`${objectFit} ${objectPosition} z-0 transition-all duration-1000 opacity-0 ${className} ${loaded && 'opacity-100'}`} 
          onLoad={() => setLoaded(true)}
          priority
        />
      </div>
    </div>
  )
}
