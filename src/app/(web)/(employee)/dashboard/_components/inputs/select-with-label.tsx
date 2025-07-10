"use client"

import { useFormContext } from "react-hook-form"

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ThreeDotLoading } from "@/components/icons/three-dot"

type DataObj = {
    id: string,
    text: string,
}

type SelectWithLabelProps<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    data: DataObj[] | undefined,
    className?: string,
    disabled?: boolean,
}

export function SelectWithLabel<S>({fieldTitle, nameInSchema, data, className, disabled}: SelectWithLabelProps<S>) {
    const form = useFormContext()

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormLabel
                        className="text-base font-semibold"
                        htmlFor={nameInSchema}
                    >
                        {fieldTitle}
                    </FormLabel>

                    <Select
                        {...field}
                        onValueChange={field.onChange}
                    >
                        <FormControl>
                            <SelectTrigger
                                disabled={disabled || !data}
                                id={nameInSchema}
                                className={`w-full !bg-background mb-2 ${className}`}
                            >
                                {data ?
                                    <SelectValue placeholder="Select" />
                                :
                                    <ThreeDotLoading />
                                }
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                            {data && data.map(item => (
                                <SelectItem
                                    key={`${nameInSchema}_${item.id}`}
                                    value={item.id}
                                >
                                    {item.text}
                                </SelectItem>
                            ))}
                        </SelectContent>

                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}