"use client"

import { useFormContext } from "react-hook-form"

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { Checkbox } from '@/components/ui/checkbox'

type CheckboxWithLabelProps<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    message: string,
}

export function CheckboxWithLabel<S>({fieldTitle, nameInSchema, message}: CheckboxWithLabelProps<S>) {
    const form = useFormContext()

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className="w-full flex justify-between items-center">
                    <FormLabel
                        className="text-base flex-1 py-2 hover:cursor-pointer text-white"
                        htmlFor={nameInSchema}
                    >
                        {fieldTitle}
                    </FormLabel>

                    <div className="flex items-center gap-2">
                        <FormControl>
                            <Checkbox
                                id={nameInSchema}
                                {...field}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        {message}
                    </div>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}