import { SUPPORTED_LOCALES } from "@/constant/general.constant"

export const pathWithoutLocale = (pathname:string, ) => { 
    const segments = pathname.split('/')
    return SUPPORTED_LOCALES.includes(segments[1])
      ? '/' + segments.slice(3).join('/')
      : pathname
  }