import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-white rounded-2xl w-full p-5">
      <div className="flex justify-between items-center">
        <h3 className="text-[#1E293B] font-semibold">All Books</h3>

        <Link
          href="/admin/allbooks/addbook"
          className="flex items-center gap-2 bg-primary-blue rounded-md py-[6px] px-3 text-white"
        >
          <Image
            src="/icons/admin/plus.svg"
            width={16}
            height={16}
            alt="plus icon"
            className="brightness-0 invert"
          />

          <span>Add a new book</span>
        </Link>
      </div>

      {/* <div className=""></div> */}
    </div>
  );
};

export default page;
