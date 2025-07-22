'use client'

import Link from 'next/link'
import React from 'react'
import { RiPhoneFill, RiMenu2Fill } from "react-icons/ri";
import { ContentWrapper } from '../content-wrapper';


export const Navbar = () => {
  return (
    <div className='w-full fixed z-50 top-0'>
      <ContentWrapper className='flex items-center justify-between p-5'>
        <div className='flex items-center gap-2'>
          <NavMenu />
          <button className='nav-button px-5 gap-1 text-sm'>
            <p className='font-semibold'>EN</p>
            /
            <p className='font-light'>IN</p>
          </button>
        </div>
        <Link href={'tel:+6282126707710'} className='nav-button px-5 gap-1'>
          <RiPhoneFill className=''/>
          <p>Contact us</p>
        </Link> 
      </ContentWrapper>
    </div>
  )
}

const NavMenu = () => {
  return (
    <>
      <button className='w-10 nav-button relative'>
        <RiMenu2Fill className='text-white text-lg ' />
      </button>
    </>
  )
}