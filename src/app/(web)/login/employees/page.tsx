"use client"

// import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { ModeToggle } from '@/components/dark-mode-selector'
import Link from 'next/link'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import { BgFixed } from '@/components/bg-fixed'



export default function LoginStaff() {
  return (
    <div className='min-h-dvh w-full relative flex items-center justify-center p-4'>
      
      {/* Background */}
      <BgFixed         
        imageUrl='/images/bg-login-l.svg'
        imageUrlDark='/images/bg-login-d.svg'
        objectPosition="object-bottom"
      />

      {/* Toggle Dark Mode */}
      <ModeToggle
        align='end'
        side='bottom'
        className='absolute top-6 right-6 sm:top-10 sm:right-10 z-50 max-md:hidden'
      />

      {/* Login Card */}
      <Card className='w-full max-w-md blur-card py-10 px-6 z-50'>
         <ModeToggle
          align='end'
          side='bottom'
          className='absolute top-6 right-6 z-50 md:hidden'
        />
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

