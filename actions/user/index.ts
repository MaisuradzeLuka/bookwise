"use server";

import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getUser = async (userId: string) => {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (!user.length) return;

    return user[0];
  } catch (error: any) {
    throw new Error(`Error while getting user: ${error}`);
  }
};
