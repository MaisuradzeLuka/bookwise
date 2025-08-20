"use server";

import { db } from "@/database";
import { booksTable, borrowedBooksTable, usersTable } from "@/database/schema";
import { BookFields, BookStatus } from "@/types";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addBook = async (bookFields: BookFields) => {
  try {
    const response = await db
      .insert(booksTable)
      .values({ ...bookFields })
      .returning();

    return {
      success: true,
      message: "Book added successfully",
      body: response[0].id,
    };
  } catch (error: any) {
    console.log("Error while adding book: ", error);
    return {
      success: false,
      message: `Coudln't add the book. Please try again later`,
    };
  }
};

export const updateBook = async <T extends object>(
  id: string,
  bookFields: T,
  table: "books" | "borrowed"
) => {
  try {
    let response = null;
    if (table === "books") {
      response = await db
        .update(booksTable)
        .set(bookFields)
        .where(eq(booksTable.id, id))
        .returning();
    } else {
      response = await db
        .update(borrowedBooksTable)
        .set(bookFields)
        .where(eq(borrowedBooksTable.id, id))
        .returning();

      revalidatePath("/admin/borrow-requests");
    }

    return {
      success: true,
      message: "Book updated successfully",
      body: response,
    };
  } catch (error: any) {
    console.log("Error while updating book: ", error);
    return {
      success: false,
      message: `Coudln't upate the book. Please try again later`,
    };
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    await db.delete(booksTable).where(eq(booksTable.id, bookId));

    revalidatePath("/admin/allbooks");
    return { success: true, message: "Book deleted successfuly" };
  } catch (error) {
    console.log("Error while deleting book: ", error);
    return {
      success: false,
      message: `Coudln't delete the book. Please try again later`,
    };
  }
};

export const getBorrowedBooks = async () => {
  try {
    const books = await db
      .select()
      .from(borrowedBooksTable)
      .innerJoin(booksTable, eq(booksTable.id, borrowedBooksTable.bookId))
      .innerJoin(usersTable, eq(usersTable.id, borrowedBooksTable.userId));

    if (!books.length) {
      return {
        seccess: false,
        message: "No books found",
      };
    }

    return {
      success: true,
      body: books,
    };
  } catch (error: any) {
    console.log(`Error while fetching books: ${error.message}`);
    return {
      success: false,
      message: "Error while getting books",
    };
  }
};

export const getUsers = async () => {
  try {
    const users = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        universityId: usersTable.universityId,
        universityCard: usersTable.universityCard,
        role: usersTable.role,
        createdAt: usersTable.createdAt,
        borrowedCount: sql<number>`COUNT(${borrowedBooksTable.bookId})`,
      })
      .from(usersTable)
      .leftJoin(
        borrowedBooksTable,
        eq(usersTable.id, borrowedBooksTable.userId)
      )
      .groupBy(usersTable.id);

    return {
      success: true,
      body: users,
    };
  } catch (error: any) {
    console.error("Error while getting users with borrow count:", error);
    return {
      success: false,
      message: "Error fetching users",
    };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await db
      .delete(borrowedBooksTable)
      .where(eq(borrowedBooksTable.userId, userId));
    await db.delete(usersTable).where(eq(usersTable.id, userId));

    revalidatePath("/admin/allusers");
    return { success: true, message: "User deleted successfuly" };
  } catch (error) {
    console.log("Error while deleting user: ", error);
    return {
      success: false,
      message: `Coudln't delete the user. Please try again later`,
    };
  }
};

export const updateUser = async (userId: string, role: "admin" | "user") => {
  try {
    await db
      .update(usersTable)
      .set({ role: role })
      .where(eq(usersTable.id, userId));

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error: any) {
    console.log("Error while updating book: ", error);
    return {
      success: false,
      message: `Coudln't upate user. Please try again later`,
    };
  }
};
