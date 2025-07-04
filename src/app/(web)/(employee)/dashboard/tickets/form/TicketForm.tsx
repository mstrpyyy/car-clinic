"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { insertTicketSchema, type InsertTicketSchemaType, type SelectTicketSchemaType } from "@/domain/ticket/schema"
import { SelectCustomerSchemaType } from "@/domain/customer/schema"


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
    tech: ticket?.tech ?? 'new-ticket@example.com',
  }

  const form = useForm<InsertTicketSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  })

  async function submitForm(data: InsertTicketSchemaType) {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id
            ? `Edit Ticket # ${ticket.id}`
            : "New Ticket Form"
          }
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8"
        >
          <p>{JSON.stringify(form.getValues())}</p>
        </form>
      </Form>

    </div>
  )
}