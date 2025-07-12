import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  return <div>{children}</div>;
};

export default RootLayout;
