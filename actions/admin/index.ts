"use server";

import { db } from "@/database";
import { booksTable, borrowedBooksTable, usersTable } from "@/database/schema";
import { BookFields } from "@/types";
import { eq } from "drizzle-orm";
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

export const updateBook = async (id: string, bookFields: BookFields) => {
  try {
    const response = await db
      .update(booksTable)
      .set(bookFields)
      .where(eq(booksTable.id, id))
      .returning();

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
      .innerJoin(booksTable, eq(booksTable.id, borrowedBooksTable.bookId));

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
    const users = await db.select().from(usersTable);

    if (!users.length) {
      return {
        seccess: false,
        message: "No users found",
      };
    }

    return {
      success: true,
      body: users,
    };
  } catch (error: any) {
    console.log(`Error while getting users: ${error.message}`);
    return {
      success: false,
      message: "Error while getting users",
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
      message: "Book updated successfully",
    };
  } catch (error: any) {
    console.log("Error while updating book: ", error);
    return {
      success: false,
      message: `Coudln't upate the book. Please try again later`,
    };
  }
};
