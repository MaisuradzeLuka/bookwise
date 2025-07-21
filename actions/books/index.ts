"use server";

import { db } from "@/database";
import { booksTable, borrowedBooksTable } from "@/database/schema";
import { desc, eq, ilike, or, sql } from "drizzle-orm";

export const getBooks = async (
  filterOptions = "",
  limit: number,
  offset = 0
) => {
  try {
    const books = await db
      .select()
      .from(booksTable)
      .where(
        filterOptions
          ? or(
              ilike(booksTable.title, `%${filterOptions}%`),
              ilike(booksTable.description, `%${filterOptions}%`),
              ilike(booksTable.genre, `%${filterOptions}%`),
              ilike(booksTable.author, `%${filterOptions}%`)
            )
          : sql`TRUE`
      )
      .limit(limit)
      .offset(offset)
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
    return {
      success: false,
      message: "Error while getting books",
    };
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

export const borrowBook = async (bookId: string, userId: string) => {
  try {
    const [book] = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.id, bookId));

    if (book.availableCoppies <= 0) {
      return {
        success: false,
        message: "Sorry, There are no available coppies to borrow!",
      };
    }

    await db.insert(borrowedBooksTable).values({ bookId, userId });

    return {
      success: true,
      message: "Borrow request has been sent",
    };
  } catch (error: any) {
    console.log(`Error while borrowing book: ${error}`);
    return {
      success: false,
      message: "couldn't book, try again later!",
    };
  }
};

export const getBorrowedBooks = async (userId: string) => {
  try {
    const books = await db
      .select()
      .from(borrowedBooksTable)
      .innerJoin(booksTable, eq(booksTable.id, borrowedBooksTable.bookId))
      .where(eq(borrowedBooksTable.userId, userId));

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
    return {
      success: false,
      message: "Error while getting books",
    };
  }
};
