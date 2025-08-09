import { getBooks } from "@/actions/books";
import Link from "next/link";
import React from "react";
import BooksListCard from "@/components/admin/BooksListCard";

const page = async () => {
  const { books } = await getBooks("", 100, 1);

  return (
    <div className="bg-white rounded-2xl w-full p-5">
      <div className="flex justify-between items-center">
        <h3 className="text-[#1E293B] font-semibold">All Books</h3>

        <Link
          href="/admin/allbooks/addbook"
          className="flex items-center gap-2 bg-primary-blue rounded-md py-[6px] px-3 text-white"
        >
          <img
            src="/icons/admin/plus.svg"
            alt="plus icon"
            className="brightness-0 invert"
          />

          <span className="hidden sm:inline">Add a new book</span>
          <span className=" sm:hidden">Add Book</span>
        </Link>
      </div>

      <ul className="grid grid-cols-8 bg-[#F8F8FF] text-[#3A354E] px-[10] py-4 rounded-sm mt-4">
        <li className="col-span-4">Book Title</li>
        <li className="flex justify-center">Author</li>
        <li className="flex justify-center">Genre</li>
        <li className="flex justify-center">Date Created</li>
        <li className="flex justify-center">Action</li>
      </ul>

      <ul>
        {books?.map((book) => (
          <BooksListCard key={book.id} {...book} />
        ))}
      </ul>
    </div>
  );
};

export default page;
