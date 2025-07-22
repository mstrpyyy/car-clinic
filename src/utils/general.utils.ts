import { SUPPORTED_LOCALES } from "@/constants/general.constant"

type ServerResponseProps = {
  data?: {
      message?: string,
  },
  serverError?: string,
  validationErrors?: Record<string, string[] | undefined>,
}

export const serverActionResponse = (result: ServerResponseProps) => {
      const { data, serverError, validationErrors } = result

      if (data?.message) return data.message
      if (serverError) return serverError
      if (validationErrors) {
        return Object.keys(validationErrors).map(key => (
          `${key}: ${validationErrors[key as keyof typeof validationErrors]}`
        ))
      }
}

export const pathWithoutLocale = (pathname:string, take: number) => { 
  const segments = pathname.split('/')
  return SUPPORTED_LOCALES.includes(segments[1])
    ? '/' + segments.slice(take).join('/')
    : pathname
}


