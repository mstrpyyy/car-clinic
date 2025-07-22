import { boolean, pgTable, text, timestamp, integer, varchar, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"

export const customers = pgTable("customers", {
  id: serial('id').primaryKey(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull().unique(),
  phone: varchar("phone").notNull().unique(),
  address: varchar("address").notNull(),
  province: varchar("province").notNull(),
  district: varchar("district").notNull(),
  city: varchar("city").notNull(),
  postCode: varchar("post_code", { length:5 }).notNull(),
  notes: text("notes"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})

export const customersRelations = relations(customers, 
  ({ many }) => ({
    tickets: many(tickets),
  })
)

export const tickets = pgTable("tickets", {
  id: serial('id').primaryKey(),
  customerId: integer("customer_id").notNull().references(() => customers.id),
  title: varchar("title").notNull(),
  description: text("description"),
  completed: boolean("completed").notNull().default(false),
  tech: varchar("tech"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})



export const ticketsRelations = relations(tickets,
  ({ one }) => ({
    customer: one(customers, {
      fields: [tickets.customerId],
      references: [customers.id]
    })
  })
)