import { SUPPORTED_LOCALES } from "@/constants/general.constant"

export const pathWithoutLocale = (pathname:string, take: number) => { 
    const segments = pathname.split('/')
    return SUPPORTED_LOCALES.includes(segments[1])
      ? '/' + segments.slice(take).join('/')
      : pathname
  }