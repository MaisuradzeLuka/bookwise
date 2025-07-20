import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  return (
    <main className="rootLayout pt-15">
      <div className="w-full max-w-[1280px] mx-auto px-4">
        <Navbar userName={session.user.name!} userId={session.user.id!} />
        {children}
      </div>
    </main>
  );
};

export default RootLayout;
