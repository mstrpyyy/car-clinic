"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { insertCustomerSchema, type InsertCustomerSchemaType, type SelectCustomerSchemaType } from "@/domain/customer/schema"
import { Button } from "@/components/ui/button"
import { InputWithLabel } from "../../_components/inputs/input-with-label"
import { TextareaWithLabel } from "../../_components/inputs/textArea-with-label"
import { provinceData } from "@/constants/province.constant"
import { SelectWithLabel } from "../../_components/inputs/select-with-label"
import { DivWrapper } from "../../_components/div-wrapper"

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
    province: customer?.province ?? '',
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
    <div className="">
      <div>
        <h1 className="text-4xl font-bold h-20 content-center">
          {customer?.id ? "Edit" : "New"} Customer Form
        </h1>
      </div>

      <DivWrapper>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
          >
            <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-8 w-full">
              <div className="flex flex-col gap-4 min-w-[250px] flex-1">
                <InputWithLabel<InsertCustomerSchemaType>
                  fieldTitle="First Name"
                  nameInSchema="firstName"
                  placeholder="ex: John"
                />

                <InputWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Last Name"
                  nameInSchema="lastName"
                  placeholder="ex: Doe"
                />

                <InputWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Email"
                  nameInSchema="email"
                  placeholder="ex: john.doe@example.com"
                />

                <InputWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Phone"
                  nameInSchema="phone"
                  placeholder="ex: 08123456789"
                />
              </div>

              <div className="flex flex-col gap-4 min-w-[250px] flex-1">
                <InputWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Address 1"
                  nameInSchema="address1"
                  placeholder="ex: Jl. Kebon Jeruk 123"
                />

                {/* <InputWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Address 2"
                  nameInSchema="address2"
                /> */}

                <SelectWithLabel<InsertCustomerSchemaType>
                  fieldTitle="province"
                  nameInSchema="province"
                  data={provinceData}
                />

                <InputWithLabel<InsertCustomerSchemaType>
                  fieldTitle="City"
                  nameInSchema="city"
                  placeholder="ex: Bandung"
                />

                <InputWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Post Code"
                  nameInSchema="postCode"
                  placeholder="ex: 12345"
                />
              </div>

              <div className="flex flex-col gap-4 min-w-[250px] flex-1">
                  <TextareaWithLabel<InsertCustomerSchemaType>
                    fieldTitle="Notes"
                    nameInSchema="notes"
                    className="resize-none"
                    placeholder="ex: Customer is..."
                  />
              </div>
            </div>

            <hr className="w-full my-8 dark:border-accent-foreground/20" />

            <div className="flex gap-4 mt-auto justify-end">
              <Button
                type="button"
                variant="secondary"
                title="Reset"
                className="max-md:flex-1 w-44"
                onClick={() => form.reset(defaultValues)}
              >
                Reset
              </Button>

              <Button
                type="submit"
                className="max-md:flex-1 w-44"
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