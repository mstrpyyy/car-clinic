'use client'


import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const BgFixed:React.FC = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const imageSrc = resolvedTheme === 'dark'
  ? '/images/bg-dashboard-d.svg'
  : '/images/bg-dashboard-l.svg'
  
  return (
    <div className='fixed top-0  z-0'>
      <div className='relative w-screen h-dvh'>
        <Image
          src={imageSrc}
          alt="banner image"
          fill
          sizes="100vw"
          className={`object-cover object-center z-0 transition-all duration-1000 opacity-0 ${loaded && 'opacity-100'}`} 
          onLoadingComplete={() => setLoaded(true)}
          priority
        />
      </div>
    </div>
  )
}
