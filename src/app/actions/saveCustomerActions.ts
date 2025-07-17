"use server"

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { customers } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { insertCustomerSchema, InsertCustomerSchemaType } from "@/domain/customer/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import z from "zod";

export const saveCustomerAction = actionClient
  .metadata({ actionName: "saveCustomerAction" }) 
  .inputSchema(insertCustomerSchema, {
    handleValidationErrorsShape: async(ve) => flattenValidationErrors(ve).fieldErrors
  })
  // .bindArgsSchemas<[customerId: z.ZodNumber]>([z.number()])
  .action(
    async ({
      parsedInput: customer,
      // bindArgsParsedInputs: [customerId],
    }: { parsedInput: InsertCustomerSchemaType }) => {

    const { isAuthenticated } = getKindeServerSession()
    const isAuth = await isAuthenticated()

    if (!isAuth) redirect('/login/employees')

    // New Customer 
    // All new customers are active by default - no need to set active to true
    // createdAt and updatedAt are set by the database
    if (customer.id === 0) {
      const result = await db.insert(customers).values({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        province: customer.province,
        city: customer.city,
        district: customer.district,
        postCode: customer.postCode,
        notes: customer.notes?.trim() || null,
        active: customer.active,
      }).returning({ insertedId: customers.id })

      return { message: `Customer ID #${result[0].insertedId} created successfully` }
    }

    // Existing customer 
    // updatedAt is set by the database
    const result = await db.update(customers)
      .set({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        province: customer.province,
        city: customer.city,
        district: customer.district,
        postCode: customer.postCode,
        notes: customer.notes?.trim() || null,
        active: customer.active,
      })
      .where(eq(customers.id, customer.id!))
      .returning({ updatedId: customers.id })

      return { message: `Customer ID #${result[0].updatedId} updated successfully` }
  })