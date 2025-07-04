"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { insertCustomerSchema, type InsertCustomerSchemaType, type SelectCustomerSchemaType } from "@/domain/customer/schema"

type CustomerFormProps = {
  customer?: SelectCustomerSchemaType,
}

type CustomerFormDefaultValues = Partial<SelectCustomerSchemaType> & InsertCustomerSchemaType;

export default function CustomerForm({ customer }: CustomerFormProps) {
  const defaultValues: CustomerFormDefaultValues = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? '',
    lastName: customer?.lastName ?? '',
    address1: customer?.address1 ?? '',
    address2: customer?.address2 ?? '',
    city: customer?.city ?? '',
    state: customer?.state ?? '',
    postCode: customer?.postCode ?? '',
    phone: customer?.phone ?? '',
    email: customer?.email ?? '',
    notes: customer?.notes ?? '',
  }

  const form = useForm<InsertCustomerSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  })

  async function submitForm(data: InsertCustomerSchemaType) {
      console.log(data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8 ">
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer Form
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full"
        >
          <p className="">{JSON.stringify(form.getValues())}</p>
        </form>
      </Form>

    </div>
  )
}