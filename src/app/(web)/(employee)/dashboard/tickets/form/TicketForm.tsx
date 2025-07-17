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
import Image from "next/image"
import { SelectWithLabel } from "../../_components/inputs/select-with-label"

import { useAction } from 'next-safe-action/hooks'
import { saveTicketAction } from "@/app/actions/saveTIcketActions"
import { LoaderCircle } from 'lucide-react'
import { toast } from "sonner"
import { serverActionResponse } from "@/utils/general.utils"

type TicketFormProps = {
    customer: SelectCustomerSchemaType,
    ticket?: SelectTicketSchemaType,
    techs?: {
        id:string
        text: string
    }[],
    isEditable?: boolean,
    userEmail?: string
}

type TicketFormDefaultValues = Omit<Partial<SelectTicketSchemaType>, "id"> & {
  id: number | "(New)";
};

export default function TicketForm({ customer, ticket, techs, isEditable = true, userEmail }: TicketFormProps) {
    const isManager = Array.isArray(techs)
    
    const defaultValues: TicketFormDefaultValues = {
        id: ticket?.id ?? "(New)",
        customerId: ticket?.customerId ?? customer.id,
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        completed: ticket?.completed ?? false,
        tech: ticket?.tech ? ticket?.tech : userEmail ? userEmail : '',
    }

    const form = useForm<InsertTicketSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertTicketSchema),
        defaultValues,
    })
    const completed = form.watch('completed');

    const { execute: executeSave, isPending: loadingSave, reset: resetSave } = useAction(saveTicketAction, {
        onSuccess({ data }) {
            // console.log('data', data);
            toast.success("success", {description: data.message})
        },
        onError({ error }) {
            const message = serverActionResponse(error)
            toast.error("Error", {description: message})
        }
    })

    async function submitForm(data: InsertTicketSchemaType) {
        // console.log(data)
        executeSave(data)
    }

    return (
        <div className="flex max-xl:flex-col gap-4 min-h-[100px]">
            <div className="flex-1 xl:max-w-md">
                <div className="sticky top-8 overflow-y-auto">
                    <h1 className="text-4xl font-bold h-20 content-center">
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
                                    <td>{customer.address}</td>
                                </tr>
                                <tr>
                                    <td className="table-title">District</td>
                                    <td>{customer.district}</td>
                                </tr>
                                <tr>
                                    <td className="table-title">City</td>
                                    <td>{customer.city}</td>
                                </tr>
                                <tr>
                                    <td className="table-title">Province</td>
                                    <td>{customer.province}</td>
                                </tr>
                                <tr>
                                    <td className="table-title">Post Code</td>
                                    <td>{customer.postCode}</td>
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
                {/* <DisplayServerActionResponse result={saveResult} /> */}
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
                                disabled={!isEditable}
                            />

                            {isManager ? 
                                <SelectWithLabel<InsertTicketSchemaType>
                                    fieldTitle="Tech ID"
                                    nameInSchema="tech"
                                    data={techs}
                                />
                            :
                                <InputWithLabel<InsertTicketSchemaType>
                                    fieldTitle="Tech"
                                    nameInSchema="tech"
                                    disabled={true}
                                    placeholder="ex: tech.email@example.com"
                                />
                            }
 
                            <TextareaWithLabel<InsertTicketSchemaType>
                                fieldTitle="Description"
                                nameInSchema="description"
                                className="h-60 resize-none"
                                placeholder="ex: Customer is having issues with..."
                                disabled={!isEditable}
                            />         

                            {ticket?.id &&
                                <CheckboxWithLabel<InsertTicketSchemaType>
                                    fieldTitle="Service Status"
                                    nameInSchema="completed"
                                    message={completed ? "Completed" : "In Progress"}
                                    formClassName=""
                                    className={`bg-background rounded-md h-9 font-semibold text-sm
                                    ${completed ? "text-green-700 dark:text-green-500" : "text-red-700 dark:text-red-500"}
                                    border border-border py-1 px-3`
                                    }
                                    disabled={!isEditable}
                                />
                            }

                            <hr className="w-full dark:border-accent-foreground/20 my-4" />
                            
                            {isEditable &&
                                <div className="flex justify-end mt-4 gap-2">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        title="Reset"
                                        className="max-lg:flex-1 w-44"
                                        onClick={() => {
                                            form.reset(defaultValues)
                                            resetSave()
                                            }}
                                        >
                                        Reset
                                    </Button>

                                    <Button
                                        type="submit"
                                        className="max-lg:flex-1 w-44"
                                        variant="default"
                                        title="Save"
                                        disabled={loadingSave}
                                    >
                                        {loadingSave ? 
                                            <>
                                                Saving
                                                <LoaderCircle className="animate-spin" /> 
                                            </>
                                        : 
                                            "Save"
                                        }
                                    </Button>                                  
                                </div>
                            }
                    </form>
                </Form>
            </DivWrapper>
        </div>
    )
}