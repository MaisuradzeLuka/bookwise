import { auth } from "@/auth";
import Sidebar from "@/components/admin/Sidebar";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { ReactNode } from "react";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, session?.user?.id!));

  return (
    <div className="flex">
      <Sidebar />

      <section className="bg-[#F8F8FF] rounded-xl flex-1 p-6">
        <div className="mb-10">
          <h2 className="text-[#1E293B] font-semibold text-2xl mb-[6px]">
            Welcome, {user[0].fullName}
          </h2>

          <p className="text-[#64748B]">
            Monitor all of your projects and tasks here
          </p>
        </div>

        {children}
      </section>
    </div>
  );
};

export default AdminLayout;
