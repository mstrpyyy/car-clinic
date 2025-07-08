"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { insertTicketSchema, type InsertTicketSchemaType, type SelectTicketSchemaType } from "@/domain/ticket/schema"
import { SelectCustomerSchemaType } from "@/domain/customer/schema"
import { InputWithLabel } from "../../_components/inputs/input-with-label"
import { TextareaWithLabel } from "../../_components/inputs/textArea-with-label"
import { Button } from "@/components/ui/button"
import { CheckboxWithLabel } from "../../_components/inputs/checkbox-with-label"
import { DivWrapper } from "../../_components/div-wrapper"
import { provinceData } from "@/constants/province.constant"
import Image from "next/image"

type TicketFormProps = {
    customer: SelectCustomerSchemaType,
    ticket?: SelectTicketSchemaType,
}

type TicketFormDefaultValues = Omit<Partial<SelectTicketSchemaType>, "id"> & {
  id: number | "(New)";
};

export default function TicketForm({ customer, ticket }: TicketFormProps) {
  const defaultValues: TicketFormDefaultValues = {
        id: ticket?.id ?? "(New)",
        customerId: ticket?.customerId ?? customer.id,
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        completed: ticket?.completed ?? false,
        tech: ticket?.tech  ?? 'unassigned',
    }

    const province = provinceData.find((province) => province.id === customer.province)?.description

    const form = useForm<InsertTicketSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertTicketSchema),
        defaultValues,
    })
    const completed = form.watch('completed');

    async function submitForm(data: InsertTicketSchemaType) {
        console.log(data)
    }

    return (
        <div className="flex max-xl:flex-col gap-4 min-h-[100px]">
            <div className="flex-1 xl:max-w-md">
                <div className="sticky top-8 overflow-y-auto">
                    <h1 className="text-4xl font-bold h-20 content-center ">
                        {ticket?.id
                            ? `Edit Ticket # ${ticket.id}`
                            : "New Ticket Form"
                        }
                    </h1>
                    <DivWrapper className="flex flex-col w-full p-4 rounded-lg border border-border">
                        <h2 className="font-bold text-2xl">Customer Info</h2>
                        <table className="text-sm w-full border-separate border-spacing-y-2">
                            <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        <hr className="w-full my-2 dark:border-accent-foreground/20" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-title">Name</td>
                                    <td>{customer.firstName} {customer.lastName}</td>
                                </tr>
                                <tr>
                                    <td className="table-title">Address</td>
                                    <td>{customer.address1}</td>
                                </tr>
                                {customer.address2 && (
                                <tr>
                                    <td className="table-title">Address 2</td>
                                    <td>{customer.address2}</td>
                                </tr>
                                )}
                                <tr>
                                    <td className="table-title">City/Province</td>
                                    <td>{customer.city}, {province} {customer.postCode}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <hr className="w-full my-2 dark:border-accent-foreground/20" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-title">Email</td>
                                    <td>{customer.email}</td>
                                </tr>
                                <tr>
                                    <td className="table-title">Phone</td>
                                    <td className="">{customer.phone}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="content-start">
                                        <hr className="w-full my-2 dark:border-accent-foreground/20 content-start" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-title">Vehicle on Service</td>
                                    <td>
                                        <div className="relative h-44">
                                            <Image src="/images/cars/template.png" alt="car" fill className="object-contain object-center" />
                                        </div>
                                        <p className="text-center">Daihatsu Sirion (2018)</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </DivWrapper>
                </div>
            </div>
            <DivWrapper className="space-y-4 xl:mt-20 flex-1">
                <h2 className="font-bold text-2xl">Ticket Form</h2>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(submitForm)}
                        className="flex flex-col space-y-4" 
                    >
                            <hr className="w-full dark:border-accent-foreground/20" />
                            <InputWithLabel<InsertTicketSchemaType>
                                fieldTitle="Title"
                                nameInSchema="title"
                                placeholder="ex: Issues with..."
                            />

                            <InputWithLabel<InsertTicketSchemaType>
                                fieldTitle="Tech"
                                nameInSchema="tech"
                                disabled={true}
                                placeholder="ex: tech.email@example.com"
                            />

                            <TextareaWithLabel<InsertTicketSchemaType>
                                fieldTitle="Description"
                                nameInSchema="description"
                                className="h-60 resize-none"
                                placeholder="ex: Customer is having issues with..."
                            />         

                            <div 
                                className={`
                                    w-full my-4 rounded-lg shadow duration-200 px-4
                                    ${completed === true 
                                        ? 'bg-green-500 dark:bg-green-600' 
                                        : 'bg-green-500/70 dark:bg-green-600/70'
                                    } 
                                `}
                            >   
                                <CheckboxWithLabel<InsertTicketSchemaType>
                                    fieldTitle="Service is Complete"
                                    nameInSchema="completed"
                                    message=""
                                />
                            </div>

                            <hr className="w-full dark:border-accent-foreground/20 my-4" />
                            
                            <div className="flex mt-4 gap-2">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    title="Reset"
                                    className="flex-1"
                                    onClick={() => form.reset(defaultValues)}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    variant="default"
                                    title="Save"
                                >
                                    Save
                                </Button>                                    
                            </div>
                    </form>
                </Form>
            </DivWrapper>
        </div>
    )
}