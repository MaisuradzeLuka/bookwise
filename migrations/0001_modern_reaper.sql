CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"genre" varchar(100) NOT NULL,
	"total_coppies" integer DEFAULT 1 NOT NULL,
	"available_coppies" integer NOT NULL,
	"image" text NOT NULL,
	"cover_color" varchar(7) NOT NULL,
	"video" text,
	"summary" text NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "books_id_unique" UNIQUE("id")
);
