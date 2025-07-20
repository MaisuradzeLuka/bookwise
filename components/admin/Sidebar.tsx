"use client";

import { adminSidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col h-screen w-[80px] md:w-[300px] px-4 py-8">
      <h1 className="flex items-center gap-2 text-primary-blue text-2xl font-bold border-b border-dashed pb-10">
        <Image
          src="/icons/admin/logo.svg"
          height={40}
          width={40}
          alt="admin logo"
        />

        <span className="hidden md:inline">BookWise</span>
      </h1>

      <ul className="flex flex-col gap-2 list-none mt-5">
        {adminSidebarLinks.map((link) => {
          const isActive =
            (link.route !== "/admin" &&
              pathname.includes(link.route) &&
              link.route.length > 1) ||
            pathname === link.route;

          return (
            <li className="cursor-pointer" key={link.id}>
              <Link
                href={link.route}
                className={`flex items-center gap-2 px-3 rounded-lg py-[14px] ${
                  isActive ? "bg-primary-blue text-white" : ""
                }`}
              >
                <Image
                  src={link.image}
                  width={20}
                  height={20}
                  alt={`${link.label} logo`}
                  className={` ${isActive ? " brightness-0 invert" : ""}`}
                />
                <span className="hidden md:inline text-[16px] font-medium">
                  {link.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Sidebar;
