'use client'

import { RiHome3Line, RiHome3Fill, RiFileUserLine, RiFileUserFill, RiFileList3Line, RiFileList3Fill, RiLogoutBoxRLine } from "react-icons/ri";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/dark-mode-selector";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { pathWithoutLocale } from "@/utils/general.utils";

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

export const Sidebar = () => {
  const pathname = usePathname()
  const currentPath = pathWithoutLocale(pathname, 3)


  return (
    <div 
      className='sticky top-0 left-0 z-50 
      flex sm:flex-col items-center 
      bg-accent/30 dark:bg-accent/50 
      backdrop-blur-sm border shadow 
      sm:h-dvh w-full sm:w-16 p-2 sm:py-6'
    >
      <Image
        src={'/logo/icon.png'} 
        alt={'carClinic logo'}
        width={500}
        height={500}
        className={`w-[40px] mx-auto`}
        priority
      />

      <nav>
        <ul className="space-y-3 sm:mt-10 max-sm:hidden z-50"> 
          {routes.map((route, idx) => {
            const isActive = currentPath.startsWith(route.url)
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
                  pointer-events-none overflow-hidden content-center
                  bg-background border shadow 
                  h-10 px-2 rounded-lg text-sm
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

      <div className="space-y-3 mt-auto max-sm:hidden">
        <ModeToggle className="w-10 h-10 rounded-lg" />

        <div className="h-[1px] bg-muted-foreground"/>
          <Button
            variant={'outline'}
            data-variant="destructive"
            className="outline-destructive-button h-10 w-10"
            aria-label='LogOut'
            title='LogOut'
          >
            <LogoutLink>
                <RiLogoutBoxRLine className=""/>
            </LogoutLink>
          </Button>
      </div>


    </div>
  )
}
