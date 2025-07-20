"use server";

import { db } from "@/database";
import { booksTable } from "@/database/schema";
import { desc, eq, sql } from "drizzle-orm";

export const getBooks = async (filterOptions = "") => {
  try {
    const books = await db
      .select()
      .from(booksTable)
      .where(filterOptions ? eq(booksTable.genre, filterOptions) : sql`TRUE`)
      .orderBy(desc(booksTable.rating));

    if (!books.length) {
      return {
        seccess: false,
        message: "No books found",
      };
    }

    return {
      success: true,
      books: books,
    };
  } catch (error: any) {
    console.log(`Error while fetching books: ${error.message}`);
  }
};

export const getSingleBook = async (bookId: string) => {
  try {
    const book = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.id, bookId))
      .limit(1);

    if (!book.length) {
      return {
        seccess: false,
        message: "No books found",
      };
    }

    return {
      success: true,
      book: book[0],
    };
  } catch (error: any) {
    console.log(`Error while fetching books: ${error.message}`);
  }
};
