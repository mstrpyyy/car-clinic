"use client"

import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { TextareaHTMLAttributes } from "react"

type TextareaWithLabelProps<S> = {
  fieldTitle: string
  nameInSchema: keyof S & string
  className?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextareaWithLabel<S>({fieldTitle, nameInSchema, className, ...props}: TextareaWithLabelProps<S>) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem
         className="flex flex-col flex-1"
        >
          <FormLabel
            className={"text-base font-semibold"}
            htmlFor={nameInSchema}
          >
              {fieldTitle}
          </FormLabel>

          <FormControl>
            <Textarea
              rows={5}
              id={nameInSchema}
              className={`${className} flex-1 min-h-44`}
              {...props}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
