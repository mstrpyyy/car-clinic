"use client"

import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputHTMLAttributes } from "react"

type InputWithLabelProps<S> = {
  fieldTitle: string
  nameInSchema: keyof S & string
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export function InputWithLabel<S>({fieldTitle, nameInSchema, className, ...props}: InputWithLabelProps<S>) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem 
          className="relative"
        >
          <FormLabel
            className={"text-base font-semibold"}
            htmlFor={nameInSchema}
          >
              {fieldTitle}
          </FormLabel>

          <FormControl>
            <Input
              id={nameInSchema}
              className={`w-full mb-2 ${className}`}
              {...props}
              {...field}
            />
          </FormControl>

          <FormMessage className="absolute -bottom-2 left-0" />
        </FormItem>
      )}
    />
  )
}
