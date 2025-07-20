"use server";

import { db } from "@/database";
import { booksTable } from "@/database/schema";
import { BookFields } from "@/types";

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
