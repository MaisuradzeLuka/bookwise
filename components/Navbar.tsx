import Image from "next/image";
import Link from "next/link";
import React from "react";
import Signout from "./Signout";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/lib/utils";

const Navbar = ({ userName, userId }: { userName: string; userId: string }) => {
  return (
    <header className="w-full mb-20">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/book.svg"
            width={40}
            height={32}
            alt="logo"
            className="brightness-0 invert"
          />

          <span className="hidden sm:inline text-white font-semibold text-3xl">
            BookWise
          </span>
        </Link>

        <div className="flex items-center gap-8 text-white">
          <Link href="/">Home</Link>
          <Link href="/search?page=1" className="text-[#EED1AC]">
            Search
          </Link>

          <Link href={`/user/${userId}`} className="flex items-center gap-1">
            <Avatar>
              <AvatarFallback className="bg-primary-100">
                <span>{getInitials(userName)}</span>
              </AvatarFallback>
            </Avatar>

            <span className="hidden sm:inline">{userName.split(" ")[0]}</span>
          </Link>

          <Signout />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
