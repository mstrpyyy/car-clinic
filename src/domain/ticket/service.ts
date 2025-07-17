import { getAllOpenTickets, getTicket, getTicketSearchResults } from "@/domain/ticket/repository";
import { removeLeadingZero } from "@/utils/backend.utils";

export async function getTicketById(id: number) {
  const validId = removeLeadingZero(id)
  const ticket = await getTicket(+validId)
  return ticket
}

export async function getOpenTickets() {
  const results = await getAllOpenTickets()
  return results
}

export async function getTicketBySearch(searchText: string) {
  const results = await getTicketSearchResults(searchText)
  return results
}