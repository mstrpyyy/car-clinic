import { BgFixed } from "@/components/bg-fixed"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/dark-mode-selector"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { RiArrowLeftLine } from "react-icons/ri";


export const metadata = {
    title: "Page Not Found",
}

export default async function NotFound() {

  const { getPermissions } = getKindeServerSession()
  const managerPermissions = await getPermissions()

  const isNotEmployee = managerPermissions?.permissions.includes("user") || managerPermissions === null

  return (
    <div className="w-screen h-screen flex justify-center items-center">

      {/* background */}
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
              <h1 className='text-4xl font-semibold text-destructive'>Page Not Found</h1>
            </CardTitle>
            <CardDescription className="">
              Sorry, the page you are looking for does not exist.
            </CardDescription>
          </CardHeader>
          <CardContent className='bg-background rounded-lg shadow-sm border p-4 text-center space-y-6'>
              <Button asChild size="lg" aria-label='return' title='return' variant={'secondary'}>
                <Link href={isNotEmployee ? '/' : '/dashboard/home'} className="w-full h-12 text-base font-medium">
                <RiArrowLeftLine />
                {isNotEmployee ?
                  "Return to Home"
                  :
                  "Return to Dashboard"
                }
                </Link>
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