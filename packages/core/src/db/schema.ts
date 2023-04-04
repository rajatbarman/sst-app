import { mysqlEnum, mysqlTable, int, text, timestamp, varchar, uniqueIndex } from "drizzle-orm/mysql-core";
import { TOKEN_TYPES } from "@core/constants";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey().notNull(),
  fullName: text("full_name"),
  email: varchar("email", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow()
}, (users) => ({
    emailIndex: uniqueIndex('email_index').on(users.email)
}));


export const usersOTP = mysqlTable("otp_users", {
  id: int("id").autoincrement().primaryKey().notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  otp: varchar("otp", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("update_at").defaultNow()
});

export const tokens = mysqlTable("tokens", {
  id: int("id").autoincrement().notNull().primaryKey(),
  token: varchar("token", { length: 256 }).notNull(),
  type: mysqlEnum('type', [String(TOKEN_TYPES.REFRESH_TOKEN)]).notNull(),
  expireAt: timestamp("expiry_at").notNull(),
  userId: int('user_id').references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
