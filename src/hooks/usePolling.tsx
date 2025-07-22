import { useRouter } from "next/navigation"
import { useEffect } from "react"



export const usePolling = (searchParams: string | null, ms: number = 6000) => {
  const router = useRouter()

  useEffect(() => {
    const intervalId = setInterval(() => {
      // console.log('interval running');
      if (!searchParams) {
        // console.log('refreshing page');
        router.refresh()
      }
    }, ms) 

    return () => clearInterval(intervalId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, ms])
}