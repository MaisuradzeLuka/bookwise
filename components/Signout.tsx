import { signOut } from "@/auth";
import Image from "next/image";
import React from "react";

const Signout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="cursor-pointer">
        <Image
          src="/icons/logout.svg"
          width={24}
          height={24}
          alt="log out button"
        />
      </button>
    </form>
  );
};

export default Signout;
