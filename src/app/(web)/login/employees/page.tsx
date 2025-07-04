"use client"

// import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { ModeToggle } from '@/components/dark-mode-selector'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'



export default function LoginStaff() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const imageSrc = resolvedTheme === 'dark'
    ? '/images/bg-login-d.svg'
    : '/images/bg-login-l.svg'

  return (
    <div className='min-h-dvh w-full relative flex items-center justify-center p-4'>
      
      {/* Background */}
      <Image
        src={imageSrc}
        alt="banner image"
        fill
        sizes="100vw"
        className="object-cover object-bottom z-0"
        priority
      />

      {/* Toggle Dark Mode */}
      <ModeToggle
        align='end'
        side='bottom'
        className='absolute top-6 right-6 sm:top-10 sm:right-10 z-50'
      />

      {/* Login Card */}
      <Card className='w-full max-w-md blur-card py-10 px-6 z-50'>
        <header>
          <Image
            src={'/logo/cclogo.png'} 
            alt={'Car Clinic logo'}
            width={414}
            height={98}
            className={`w-[150px] mx-auto`}
            priority
          />
        </header>
        <main className="space-y-8 ">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center mb-2">
              <h1 className='text-4xl font-semibold'>Employee Portal</h1>
            </CardTitle>
            <CardDescription>
              Sign in to Access dashboard and resources
            </CardDescription>
          </CardHeader>
          <CardContent className='bg-background rounded-lg shadow-sm border p-4 text-center space-y-6'>
            <Button asChild size="lg" aria-label='LogIn' title='LogIn'>
              <LoginLink className="w-full h-12 text-base font-medium">
                <Shield className="h-5 w-5" />
                Secure Login
              </LoginLink>
            </Button>
            <p className="text-xs text-muted-foreground">
              Need help? 
              <Link href={'/'} className='hover:underline ml-1 text-accent-foreground'>
                Contact IT support.
              </Link>
            </p>
          </CardContent>
        </main>
        
        <footer className="text-center text-xs text-muted-foreground mt-6">
          <p>© 2025 Car Clinic. All rights reserved.</p>
        </footer>
      </Card>
    </div>
  )
}

