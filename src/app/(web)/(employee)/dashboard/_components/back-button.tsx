"use client"

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { RiArrowLeftLine } from "react-icons/ri";

type BackButton = {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link'
  title?: string
  className?: string
}

export const BackButton:React.FC<BackButton> = ({variant, title, className}) => {
  const router = useRouter()

  return (
    <Button
      variant={variant ?? 'secondary'}
      title={title ?? 'Return'}
      onClick={() => router.back()}
      className={`${className}`}
    >
      <RiArrowLeftLine />
      {title ?? 'Return'}
    </Button>
  )
}
