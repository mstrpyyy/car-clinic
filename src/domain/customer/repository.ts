import { eq, ilike, or, sql } from "drizzle-orm";
import { db } from "../../db";
import { customers } from "../../db/schema";


export async function getCustomer(id: number) {
  const customer = await db.select()
    .from(customers)
    .where(eq(customers.id, id))

  return customer[0]
}

export async function getCustomerSearch(searchText: string) {
  const results = await db.select()
    .from(customers)
    .where(or(
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.address, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${customers.lastName})) LIKE 
        ${`%${searchText.toLowerCase().replace(' ', '%')}%`}`,
    ))
  return results
}