import {
  date,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const roleEnum = pgEnum("role_enum", ["admin", "user"]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  universityId: integer("university_id").notNull(),
  universityCard: text("university_card").notNull(),
  role: roleEnum("role").default("user"),
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

const statusEnum = pgEnum("borrow_status", [
  "approved",
  "rejecting",
  "pending",
  "returned",
]);

export const borrowedBooksTable = pgTable("borrowedBooks", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  bookId: uuid("book_id")
    .notNull()
    .references(() => booksTable.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  dueDate: date("due_date"),
  borrowDate: date("borrow_date"),
  status: statusEnum("status").notNull().default("pending"),
});
