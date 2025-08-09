"use client";

import { deleteBook } from "@/actions/admin";
import { Image } from "@imagekit/next";
import { Edit3, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import RequestModal from "./RequestModal";

type Props = {
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

const BooksListCard = ({
  id,
  image,
  author,
  title,
  genre,
  createdAt,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteBook(id);

    if (res.success) {
      toast.success(res.message);
      setIsOpen(false);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <li className="grid grid-cols-8 px-[10] py-4 rounded-sm mt-4">
      <div className="col-span-4 flex items-center gap-2">
        <Image
          src={image}
          width={30}
          height={40}
          alt="book cover"
          className="w-8 h-10 object-cover"
        />
        <span className="text-[#1E293B] font-semibold">{title}</span>
      </div>

      <span className="flex justify-center text-[#3A354E] font-medium">
        {author}
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

        <RequestModal
          variant="delete"
          triggerIcon={<Trash2 className="text-[#EF3A4B]" />}
          btnText="Delete book"
          onSubmit={handleDelete}
          title="Do you want to delete this book?"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </li>
  );
};

export default BooksListCard;
