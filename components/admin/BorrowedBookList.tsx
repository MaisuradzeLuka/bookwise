"use client";

import { deleteBook } from "@/actions/admin";
import { Image } from "@imagekit/next";
import { Edit3, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

type Props = {
  book: {
    id: string;
    title: string;
    author: string;
    genre: string;
    totalCoppies: number;
    availableCoppies: number;
    image: string;
    rating: string;
    cover: string;
    video: string | null;
    summary: string;
    description: string;
    createdAt: Date | null;
  };
  borrowedBook: {
    id: string;
    bookId: string;
    userId: string;
    createdAt: Date | null;
    dueDate: string | null;
    borrowDate: string | null;
    status: "approved" | "rejecting" | "pending" | "returned";
  };
};

const BorrowedBooksList = ({ book, borrowedBook }: Props) => {
  return (
    <li className="grid grid-cols-8 px-[10] py-4 rounded-sm mt-4">
      <div className="col-span-4 flex items-center gap-2">
        <Image
          src={book.image}
          width={30}
          height={40}
          alt="book cover"
          className="w-8 h-10 object-cover"
        />
        <span className="text-[#1E293B] font-semibold">{book.title}</span>
      </div>

      <span className="flex justify-center text-[#3A354E] font-medium">
        <Image />
      </span>

      <span className="flex justify-center text-[#3A354E] font-medium">
        {genre}
      </span>

      <span className="flex justify-center text-[#3A354E] font-medium">
        {createdAt?.toISOString().slice(0, 10)}
      </span>

      <div className="flex justify-center items-center gap-2">
        <Link
          href={`/admin/allbooks/editbooks/${id}`}
          className="cursor-pointer"
        >
          <Edit3 className="text-[#0089F1]" />
        </Link>
      </div>
    </li>
  );
};

export default BorrowedBooksList;
