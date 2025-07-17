import { getCustomer, getCustomerSearch } from "@/domain/customer/repository";
import { removeLeadingZero } from "@/utils/backend.utils";

export async function getCustomerById(id: number) {
  const validId = removeLeadingZero(id)
  const customer = await getCustomer(validId)

  return customer
}

export async function getCustomerBySearch(searchText: string) {
  const results = await getCustomerSearch(searchText)
  return results
}
