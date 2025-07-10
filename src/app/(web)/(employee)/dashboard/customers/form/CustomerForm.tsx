/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { insertCustomerSchema, type InsertCustomerSchemaType, type SelectCustomerSchemaType } from "@/domain/customer/schema"
import { Button } from "@/components/ui/button"
import { InputWithLabel } from "../../_components/inputs/input-with-label"
import { TextareaWithLabel } from "../../_components/inputs/textArea-with-label"
import { SelectWithLabel } from "../../_components/inputs/select-with-label"
import { DivWrapper } from "../../_components/div-wrapper"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { CheckboxWithLabel } from "../../_components/inputs/checkbox-with-label"
import { useEffect, useState } from "react"
import { fetchAddressData } from "@/utils/post.utils"

type CustomerFormProps = {
  customer?: SelectCustomerSchemaType,
}

type address = {
  id: string,
  text:string
}

type CustomerFormDefaultValues = Partial<SelectCustomerSchemaType> & InsertCustomerSchemaType;

export default function CustomerForm({ customer }: CustomerFormProps) {
  const [provinceList, setProvinceList] = useState<address[] | undefined>()
  const [cityList, setCityList] = useState<address[] | undefined>()
  const [districtList, setDistrictList] = useState<address[] | undefined>()
  const [postCodeList, setPostCodeList] = useState<address[] | undefined>()
  const { getPermission, isLoading } = useKindeBrowserClient()
  const isManager = !isLoading && getPermission('manager')?.isGranted

  const defaultValues: CustomerFormDefaultValues = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? '',
    lastName: customer?.lastName ?? '',
    address: customer?.address ?? '',
    province: customer?.province ?? '',
    city: customer?.city ?? '',
    district: customer?.district ?? '',
    postCode: customer?.postCode ?? '',
    phone: customer?.phone ?? '',
    email: customer?.email ?? '',
    notes: customer?.notes ?? '',
    active: customer?.active ?? true,
  }

  const form = useForm<InsertCustomerSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  })

  const active = form.watch('active');
  const province = form.watch('province');
  const city = form.watch('city');
  const district = form.watch('district');
  const postCode = form.watch('postCode');

  console.log(city, district ,postCode)

  // FETCH PROVICE
  useEffect(() => {
    fetchAddressData({
      url: '/address/provinces',
      currentId: province,
      setList: setProvinceList,
      form,
      fieldName: 'province',
    });

    return () => {
      setProvinceList(undefined);
    }
  }, []);

  // FETCH CITY
  useEffect(() => {
    if (!province) {
      setCityList([]);
      return
    }
    fetchAddressData({
      url: '/address/cities',
      query: { id: province },
      currentId: city,
      setList: setCityList,
      form,
      fieldName: 'city',
      resetFields: ['district', 'postCode'],
    });

    return () => {
      setCityList(undefined);
    }
  }, [province]);

  // FETCH DISTRICT
  useEffect(() => {
    if (!city) {
      setDistrictList([]);
      return
    }
    fetchAddressData({
      url: '/address/districts',
      query: { id: city },
      currentId: district,
      setList: setDistrictList,
      form,
      fieldName: 'district',
      resetFields: ['postCode'],
    });

    return () => {
      setDistrictList(undefined);
      
    }
  }, [city]);

  // FETCH POSTCODE
  useEffect(() => {
    if (!district) {
      setPostCodeList([]);
      return
    }
    fetchAddressData({
      url: '/address/postcodes',
      query: { cityId: city, districtId: district },
      currentId: postCode,
      setList: setPostCodeList,
      form,
      fieldName: 'postCode',
    });

    return () => {
      setPostCodeList(undefined);
    }
  }, [district]);


  async function submitForm(data: InsertCustomerSchemaType) {
      console.log(data)
  }

  return (
    <div className="">
      <div>
        <h1 className="text-4xl font-bold h-20 content-center">
          {customer?.id ? "Edit" : "New"} Customer {customer?.id ? `#${customer.id}` : "Form"}
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

                <CheckboxWithLabel<InsertCustomerSchemaType>
                    fieldTitle="Customer Status"
                    nameInSchema="active"
                    message={active ? "Active" : "Inactive"}
                    disabled={!isLoading && isManager && customer?.id ? false : true} 
                    className={`bg-background rounded-md h-9 
                      ${active ? "text-green-700 font-semibold dark:text-green-500" : "text-red-700 font-semibold dark:text-red-500"}
                      border border-border py-1 px-3`
                    }
                />
              </div>

              <div className="flex flex-col gap-4 min-w-[250px] flex-1">
                <InputWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Address"
                  nameInSchema="address"
                  placeholder="ex: Jl. Kebon Jeruk 123"
                />

                <SelectWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Province"
                  nameInSchema="province"
                  data={provinceList}
                />

                <SelectWithLabel<InsertCustomerSchemaType>
                  fieldTitle="City"
                  nameInSchema="city"
                  data={cityList}
                  disabled={!province}
                />
              
                <SelectWithLabel<InsertCustomerSchemaType>
                  fieldTitle="District"
                  nameInSchema="district"
                  data={districtList}
                  disabled={!city}
                />

                <SelectWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Post Code"
                  nameInSchema="postCode"
                  data={postCodeList}
                  disabled={!district}
                  className="mb-0"
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