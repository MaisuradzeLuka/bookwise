import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./database";
import { usersTable } from "./database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;
        const existingUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, credentials.email as string))
          .limit(1);

        if (existingUser.length === 0) throw new Error("User doesn't exist");

        const isPasswordCorrect = await compare(
          credentials.password as string,
          existingUser[0].password as string
        );

        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect");
        }

        return existingUser[0] as User;
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
});
