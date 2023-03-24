import { mysqlTable, serial, text, timestamp, varchar, uniqueIndex } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow()
}, (users) => ({
    emailIndex: uniqueIndex('email_index').on(users.email)
}));
