import { getSingleBook } from "@/actions/books";
import BookForm from "@/components/admin/forms/BookForm";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const res = await getSingleBook(id);

  const book = res?.book;

  const defaultValues = {
    title: book?.title || "",
    author: book?.author || "",
    genre: book?.genre || "",
    totalCoppies: book?.totalCoppies || 0,
    image: book?.image || "",
    rating: +book?.rating! || 1,
    cover: book?.cover || "",
    video: book?.video || "",
    summary: book?.summary || "",
    description: book?.description || "",
  };

  return (
    <>
      <Link
        className="rounded-xl font-medium text-[#3A354E] bg-white py-[10px] px-4"
        href="/admin/allbooks"
      >
        Go Back
      </Link>

      <BookForm type="edit" defaultValues={defaultValues} bookId={book?.id!} />
    </>
  );
};

export default page;
