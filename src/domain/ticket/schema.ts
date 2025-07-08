import { z } from "zod";

export const insertTicketSchema = z.object({
  id: z.union([z.number(), z.literal("(New)")]),
  customerId: z.number({ required_error: "Customer ID is required" }),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  completed: z.boolean().optional(), // will use default from DB
  tech: z.string().optional().nullable(), // will use default 'unassigned' if omitted
});

export const selectTicketSchema = z.object({
  id: z.number(),
  customerId: z.number(),
  title: z.string(),
  description: z.string().nullable().optional(),
  completed: z.boolean(),
  tech: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type InsertTicketSchemaType = z.infer<typeof insertTicketSchema>;
export type SelectTicketSchemaType = z.infer<typeof selectTicketSchema>;

