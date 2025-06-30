'use client'

import { RiHome3Line, RiHome3Fill, RiFileUserLine, RiFileUserFill, RiFileList3Line, RiFileList3Fill } from "react-icons/ri";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/dark-mode-selector";

const routes = [
  {
    name: 'Home',
    url: '/dashboard/home',
    defaultIcon: <RiHome3Line/>,
    activeIcon: <RiHome3Fill/>,
  },
  {
    name: 'Costumers',
    url: '/dashboard/costumers',
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
      ? '/' + segments.slice(2).join('/')
      : pathname
  })()


  return (
    <div className='sticky h-dvh top-0 left-0 border shadow w-16 flex flex-col items-center justify-between py-3 z-50 bg-background'>
      <nav>
        <ul className="space-y-3">
          {routes.map((route, idx) => {
            const isActive = pathWithoutLocale === route.url
            return (
              <li key={idx} className="relative block group">
                <Link
                  href={`${route.url}`}
                  className={`rounded-full h-10 w-10 flex items-center justify-center text-2xxl hover:bg-accent duration-200
                  ${isActive ? 'text-primary' : 'text-sidebar-foreground'}  
                  `}
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

      <ModeToggle />

    </div>
  )
}
