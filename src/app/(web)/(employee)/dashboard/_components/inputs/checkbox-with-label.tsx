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
    labelClassName?: string,
    formClassName?: string,
    className?: string,
    disabled?: boolean,
}

export function CheckboxWithLabel<S>({fieldTitle, nameInSchema, message, labelClassName, formClassName, className, disabled}: CheckboxWithLabelProps<S>) {
    const form = useFormContext()

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className={`${formClassName}`}> 
                    <FormLabel
                        className={`text-base font-semibold ${labelClassName}`}
                        htmlFor={nameInSchema}
                    >
                        {fieldTitle}
                    </FormLabel>

                    <div className={`flex items-center gap-2 ${disabled && 'cursor-not-allowed text-foreground/50'} ${className}`}> 
                        <FormControl>
                            <Checkbox
                                id={nameInSchema}
                                {...field}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={disabled}
                                className={disabled ? '!cursor-not-allowed' : ''}
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