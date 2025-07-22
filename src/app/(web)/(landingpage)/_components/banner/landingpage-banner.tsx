import Image from 'next/image'
import React from 'react'

export const Banner = () => {
  return (
    <section className='relative h-dvh w-full overflow-hidden'>
      <Image
        src={'https://images.pexels.com/photos/10126656/pexels-photo-10126656.jpeg'} 
        alt={'banner image'}
        fill 
        sizes={'100vw'}
        className="object-cover object-center"
        priority
      />

    </section>
  )
}
