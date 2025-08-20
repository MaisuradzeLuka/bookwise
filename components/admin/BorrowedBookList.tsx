"use client";

import { updateBook } from "@/actions/admin";
import { Image } from "@imagekit/next";
import { Check, ShieldCheck, ShieldX, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import RequestModal from "./RequestModal";
import { getDueStatus, getStatusTypes } from "@/lib/utils";

type Props = {
  book: {
    title: string;
    image: string;
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
  user: {
    fullname: string;
    email: string;
  };
};

const BorrowedBooksList = ({ book, borrowedBook, user }: Props) => {
  const [rejectIsOpen, setRejectIsOpen] = useState(false);
  const [approveIsOpen, setApproveIsOpen] = useState(false);

  const onApprove = async () => {
    const borrowDate = new Date();

    const bookFields = {
      status: "approved",
      borrowDate,
      dueDate: new Date(borrowDate.getTime() + 30 * 24 * 60 * 60 * 1000),
    };

    const res = await updateBook(borrowedBook.id, bookFields, "borrowed");

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    setApproveIsOpen(false);
  };

  const onReject = async () => {
    const res = await updateBook(
      borrowedBook.id,
      { status: "rejecting" },
      "borrowed"
    );

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    setRejectIsOpen(false);
  };

  return (
    <li className="grid grid-cols-9 items-center px-[10] py-4 rounded-sm mt-4">
      <div className="col-span-2 flex items-center gap-2">
        <Image
          src={book.image}
          width={30}
          height={40}
          alt="book cover"
          className="w-8 h-10 object-cover"
        />
        <span className="text-[#1E293B] font-semibold">{book.title}</span>
      </div>

      <div className="col-span-2 flex items-center gap-2">
        <img
          src="/images/f1075b1e8f0df2d464c003934c69d99229bfd324.png"
          className="w-10 h-10 object-cover rounded-full"
        />

        <div className="flex flex-col gap-1">
          <span className="text-[#1E293B] font-semibold">{user.fullname}</span>
          <span className="text-[#64748B]">{user.email}</span>
        </div>
      </div>

      <span
        className="w-min h-min flex justify-center mx-auto py-1 px-[10px] rounded-2xl font-medium"
        style={{
          color: getStatusTypes(borrowedBook.status).color,
          background: getStatusTypes(borrowedBook.status).color + 33,
        }}
      >
        {getStatusTypes(borrowedBook.status).text}
      </span>

      <span className="flex justify-center text-[#3A354E] font-medium">
        {borrowedBook.borrowDate || "Undefined"}
      </span>

      <span className="flex justify-center text-[#3A354E] font-medium">
        {"Undefined"}
      </span>

      <span
        className={`flex justify-center font-medium ${
          getDueStatus(borrowedBook.dueDate).status === "overdue"
            ? "text-red-500"
            : "text-[#3A354E]"
        }`}
      >
        {borrowedBook.dueDate || "Undefined"}
      </span>

      {borrowedBook.status === "approved" ? (
        <ShieldCheck className="mx-auto text-green-500" />
      ) : borrowedBook.status === "rejecting" ? (
        <ShieldX className="mx-auto text-red-500" />
      ) : (
        <div className="flex justify-center">
          <RequestModal
            variant={"delete"}
            triggerIcon={<Trash2 className="text-red-500" />}
            onSubmit={onReject}
            title={"Do you want to reject this request?"}
            btnText={"Reject"}
            isOpen={rejectIsOpen}
            setIsOpen={setRejectIsOpen}
          />

          <RequestModal
            variant={"approve"}
            triggerIcon={<Check className="text-green-500" />}
            onSubmit={onApprove}
            title={"Do you want to approve this request?"}
            btnText={"Approve"}
            isOpen={approveIsOpen}
            setIsOpen={setApproveIsOpen}
          />
        </div>
      )}
    </li>
  );
};

export default BorrowedBooksList;
