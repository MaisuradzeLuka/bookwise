import { getUserState } from "@/actions/auth";
import { auth, signOut } from "@/auth";
import Signout from "@/components/Signout";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { after } from "next/server";

const page = async () => {
  const session = await auth();

  after(async () => {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session?.user?.id!))
      .limit(1);

    if (user[0].lastActivity === new Date().toISOString().slice(0, 10)) {
      return;
    }

    await db
      .update(usersTable)
      .set({ lastActivity: new Date().toISOString().slice(0, 10) })
      .where(eq(usersTable.id, session?.user?.id!));
  });

  return <Signout />;
};

export default page;
