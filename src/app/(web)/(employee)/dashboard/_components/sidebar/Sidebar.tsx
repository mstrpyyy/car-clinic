'use client'

import { RiHome3Line, RiHome3Fill, RiFileUserLine, RiFileUserFill, RiFileList3Line, RiFileList3Fill, RiLogoutBoxRLine } from "react-icons/ri";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/dark-mode-selector";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const routes = [
  {
    name: 'Home',
    url: '/dashboard/home',
    defaultIcon: <RiHome3Line/>,
    activeIcon: <RiHome3Fill/>,
  },
  {
    name: 'Costumers',
    url: '/dashboard/customers',
    defaultIcon: <RiFileUserLine/>,
    activeIcon: <RiFileUserFill/>
  },
  {
    name: 'Tickets',
    url: '/dashboard/tickets',
    defaultIcon: <RiFileList3Line/>,
    activeIcon: <RiFileList3Fill/>,
  },
] as const

const SUPPORTED_LOCALES = ['en', 'id']

export const Sidebar = () => {
  const pathname = usePathname()

  const pathWithoutLocale = (() => {
    const segments = pathname.split('/')
    return SUPPORTED_LOCALES.includes(segments[1])
      ? '/' + segments.slice(3).join('/')
      : pathname
  })()


  return (
    <div className='sticky h-dvh top-0 left-0 border shadow w-16 flex flex-col items-center py-6 z-50 bg-background'>

      <Image
        src={'/logo/icon.png'} 
        alt={'carClinic logo'}
        width={500}
        height={500}
        className={`w-[40px] mx-auto`}
        priority
      />

      <nav>
        <ul className="space-y-3 mt-10">
          {routes.map((route, idx) => {
            const isActive = pathWithoutLocale === route.url
            return (
              <li key={idx} className="relative block group">
                <Link
                  href={`${route.url}`}
                  data-variant={isActive}
                  className={`sidebar-button`}
                >
                  {isActive ? route.activeIcon :  route.defaultIcon}
                </Link>
                <div 
                  className={`absolute left-16 top-1/2 -translate-y-1/2 
                  pointer-events-none
                  h-10 bg-background/50 backdrop-blur-sm border shadow overflow-hidden px-2 content-center rounded-lg text-sm
                  -translate-x-3 group-hover:translate-x-0
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200 ease-in-out`}
                >
                  {route.name}
                </div>
              </li>

            )
          })
          }
        </ul>
      </nav>

      <div className="space-y-3 mt-auto">
        <ModeToggle className="w-10 h-10 rounded-lg" />

        <div className="h-[1px] bg-muted-foreground"/>

          <Button variant={'outline'} data-variant="destructive" className="outline-destructive-button h-10 w-10" aria-label='LogOut' title='LogOut'>
        <LogoutLink>
            <RiLogoutBoxRLine className=""/>
        </LogoutLink>
          </Button>
      </div>


    </div>
  )
}
