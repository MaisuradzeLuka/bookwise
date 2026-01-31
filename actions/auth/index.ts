"use server";

import { signIn } from "@/auth";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { Credentials } from "@/types";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { headers } from "next/headers";
import rateLimit from "@/lib/ratelimit";
import { workflowClient } from "@/lib/workflow";
import config from "@/lib/config";

const ONE_DAY_IN_MS = 60 * 60 * 24 * 1000;
const THREE_DAYS_IN_MS = ONE_DAY_IN_MS * 3;
const ONE_MONTH_IN_MS = ONE_DAY_IN_MS * 30;

export const signInWithCredentials = async (
  credentials: Pick<Credentials, "email" | "password">,
) => {
  const { email, password } = credentials;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await rateLimit.limit(ip);

  if (!success) return { success: false, message: "Too many requests" };

  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    return { success: true };
  } catch (error: any) {
    console.log(`Couldn't sign in user: ${error}`);
    return { success: false, message: "Password or email is incorrect" };
  }
};

export const signUpWithCredentials = async (credentials: Credentials) => {
  const { fullname, email, password, universityCard, universityId } =
    credentials;

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, message: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(usersTable).values({
      fullName: fullname,
      email,
      password: hashedPassword,
      universityCard,
      universityId: +universityId,
      role: "user",
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error: any) {
    console.log(`Couldn't sign up the user: ${error.message}`);
    return { success: false, message: error.message };
  }
};

export const getUserState = async (email: string) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  const lastActivity = new Date(user[0]?.lastActivity!);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - lastActivity.getTime();

  if (timeDifference > THREE_DAYS_IN_MS && timeDifference < ONE_MONTH_IN_MS) {
    return "non-active";
  }

  return "active";
};
