"use client";

import Image from "next/image";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { BookTypes } from "@/types";
import { Button } from "./ui/button";
import { generateDueDate } from "@/lib/utils";
import { borrowBook } from "@/actions/books";
import { toast } from "sonner";
import { useState } from "react";

type Props = BookTypes & {
  userId: string;
};

const BorrowBook = ({
  title,
  rating,
  author,
  description,
  genre,
  id,
  userId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    const res = await borrowBook(id, userId);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 py-[10px] px-5 rounded-sm bg-primary-100 text-black w-max cursor-pointer"
      >
        <Image src="/icons/book.svg" width={20} height={20} alt="book icon" />
        BORROW BOOK REQUEST
      </DialogTrigger>

      <DialogContent className="rootLayout z-99 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Do you want to borrow {title}
          </DialogTitle>
        </DialogHeader>

        <div className="w-full h-[1px] bg-white my-4" />

        <div className="flex flex-col gap-3">
          <p>
            Return date will be{" "}
            <span className="text-primary-100">{generateDueDate()}</span>
          </p>

          <p>
            Rating: <span className="text-primary-100">{rating}/5</span>
          </p>
          <p>
            Author: <span className="text-primary-100">{author}</span>
          </p>
          <p>
            Genre: <span className="text-primary-100">{genre}</span>
          </p>

          <p className="text-sm">{description}</p>
        </div>

        <DialogFooter className="justify-self-start">
          <Button
            onClick={handleClick}
            className=" flex items-center gap-2 py-[10px] px-5 rounded-sm bg-primary-100 text-black w-max cursor-pointer"
          >
            Borrow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBook;
