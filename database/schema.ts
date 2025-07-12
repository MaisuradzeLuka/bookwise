import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  universityId: integer("university_id").notNull(),
  universityCard: text("university_card").notNull(),
  password: text("password").notNull(),
  lastActivity: date("last_activity").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
