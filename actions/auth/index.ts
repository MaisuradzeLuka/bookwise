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

export const signInWithCredentials = async (
  credentials: Pick<Credentials, "email" | "password">
) => {
  const { email, password } = credentials;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await rateLimit.limit(ip);

  if (!success) return { success: false, message: "Too many requests" };

  try {
    const singnedInUser = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (singnedInUser) return { success: true };
  } catch (error: any) {
    console.log(`Couldn't sign in user: ${error.message}`);
    return { success: false, message: error.message };
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
      universityId,
    });

    // await signInWithCredentials({ email, password: hashedPassword });

    await workflowClient.trigger({
      url: `${config.env.productionApiEndpoint}/api/auth/workflow`,
      body: {
        email,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.log(`Couldn't sign up the user: ${error.message}`);
    return { success: false, message: error.message };
  }
};
