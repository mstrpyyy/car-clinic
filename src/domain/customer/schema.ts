import { z } from "zod"

export const insertCustomerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional().nullable(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "province is required"),
  postCode: z.string().length(5, "Postcode must be exactly 5 digits"),
  email: z.string().email("Invalid email address"),
  phone: z.string()
    .min(8, "Phone number must be at least 8 digits")
    .max(12, "Phone number must be less than 12 digits"),
  notes: z.string().max(1000, "Notes must be less than 1000 characters").nullable().optional(),
  active: z.boolean().optional(), // Usually optional, use DB default if missing
  // id, createdAt, updatedAt are usually auto-managed, so omit from insert validation
});

export const selectCustomerSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  city: z.string(),
  province: z.string(),
  postCode: z.string(),
  email: z.string().email(),
  phone: z.string(),
  notes: z.string().optional().nullable(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});


export type InsertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;
export type SelectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;