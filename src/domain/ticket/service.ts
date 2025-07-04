import { getTicket } from "@/domain/ticket/repository";
import { removeLeadingZero } from "@/utils/backend.utils";

export async function getTicketById(id: number) {
  const validId = removeLeadingZero(id)
  const ticket = await getTicket(+validId)

  return ticket
}
