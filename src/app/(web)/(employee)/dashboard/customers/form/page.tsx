// import * as Sentry from "@sentry/nextjs"
import { BackButton } from "../../_components/back-button"
import { getCustomerById } from "@/domain/customer/service"
import CustomerForm from "./CustomerForm"

type CustomerFormPage = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export async function generateMetadata({ searchParams }: CustomerFormPage) {
  const { c } = await searchParams

  if (c) {
    return {title: `Edit customer #${c}` }
  } else {
    return {title: 'New Customer'}
  }
}

export default async function CustomerFormPage({searchParams}:CustomerFormPage) {
  try {
    const { c } = await searchParams

    if (c) {
      const customer = await getCustomerById(+c)     

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">Customer ID #{c} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }
      // update customer form component 
      return <CustomerForm customer={customer} />
    } else {
      // create customer form component 
      return <CustomerForm />
    }

  } catch (e) {
    if (e instanceof Error) {
      // Sentry.captureException(e)
      throw e
    }
  }
}