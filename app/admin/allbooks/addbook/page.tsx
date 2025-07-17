import BookForm from "@/components/admin/forms/BookForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Link
        className="rounded-xl font-medium text-[#3A354E] bg-white py-[10px] px-4"
        href="/admin/allbooks"
      >
        Go Back
      </Link>

      <BookForm />
    </>
  );
};

export default page;
