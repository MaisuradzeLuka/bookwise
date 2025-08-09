CREATE TYPE "role_enum" AS ENUM ('admin', 'user');




CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"genre" varchar(100) NOT NULL,
	"total_coppies" integer DEFAULT 1 NOT NULL,
	"available_coppies" integer NOT NULL,
	"image" text NOT NULL,
	"rating" numeric NOT NULL,
	"cover_color" varchar(7) NOT NULL,
	"video" text,
	"summary" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "books_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "borrowedBooks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"book_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"due_date" date,
	"borrow_date" date,
	"status" "borrow_status" DEFAULT 'pending' NOT NULL,
	CONSTRAINT "borrowedBooks_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"university_id" integer NOT NULL,
	"university_card" text NOT NULL,
	"role" "role_enum" DEFAULT 'user',
	"password" text NOT NULL,
	"last_activity" date DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "borrowedBooks" ADD CONSTRAINT "borrowedBooks_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrowedBooks" ADD CONSTRAINT "borrowedBooks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;