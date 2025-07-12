import { signOut } from "@/auth";
import React from "react";

const Signout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
};

export default Signout;
