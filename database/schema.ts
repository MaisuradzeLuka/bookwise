import { decimal } from "drizzle-orm/mysql-core";
import {
  date,
  integer,
  numeric,
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

export const booksTable = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  genre: varchar("genre", { length: 100 }).notNull(),
  totalCoppies: integer("total_coppies").notNull().default(1),
  availableCoppies: integer("available_coppies").notNull(),
  image: text("image").notNull(),
  rating: numeric("rating").notNull(),
  cover: varchar("cover_color", { length: 7 }).notNull(),
  video: text("video"),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
