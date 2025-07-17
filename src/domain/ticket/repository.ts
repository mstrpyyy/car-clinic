import { asc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "../../db";
import { customers, tickets } from "../../db/schema";


export async function getTicket(id: number) {
  const ticket = await db.select()
    .from(tickets)
    .where(eq(tickets.id, id))

  return ticket[0]
}

export async function getAllOpenTickets() {
  const result = await db.select({
    id: tickets.id,
    ticketDate: tickets.createdAt,
    title: tickets.title,
    firstName: customers.firstName,
    lastName: customers.lastName,
    email: customers.email,
    tech: tickets.tech,
    completed: tickets.completed,
  })
  .from(tickets)
  .leftJoin(customers, eq(tickets.customerId, customers.id))
  .where(eq(tickets.completed, false))
  .orderBy(asc(tickets.createdAt))

  return result
}

export async function getTicketSearchResults(searchText: string) {
  const results = await db.select({
    id: tickets.id,
    ticketDate: tickets.createdAt,
    title: tickets.title,
    firstName: customers.firstName,
    lastName: customers.lastName,
    email: customers.email,
    tech: tickets.tech,
    completed: tickets.completed,
  })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(or(
        ilike(tickets.title, `%${searchText}%`),
        ilike(tickets.tech, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.address, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${customers.lastName})) LIKE 
        ${`%${searchText.toLowerCase().replace(' ', '%')}%`}`,
    ))
    .orderBy(asc(tickets.createdAt))
  return results
}   

export type TicketSearchResultsType = Awaited<ReturnType<typeof getTicketSearchResults>>