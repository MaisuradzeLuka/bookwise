import { ReactNode } from "react";

import "../globals.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function authLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (session?.user) redirect("/");

  return (
    <div className="authLayout">
      <div className="authFormWrapper  w-full flex items-center px-4 text-white">
        {children}
      </div>
      <div className="authImg" />
    </div>
  );
}
