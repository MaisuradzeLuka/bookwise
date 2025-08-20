import { getBorrowedBooks } from "@/actions/admin";
import BorrowedBooksList from "@/components/admin/BorrowedBookList";
import React from "react";

const page = async () => {
  const { body } = await getBorrowedBooks();

  return (
    <div className="bg-white rounded-2xl w-full p-5">
      <div className="flex justify-between items-center">
        <h3 className="text-[#1E293B] font-semibold">All Books</h3>
      </div>

      <ul className="grid grid-cols-9 bg-[#F8F8FF] text-[#3A354E] px-[10] py-4 rounded-sm mt-4">
        <li className="col-span-2">Book</li>
        <li className="col-span-2">Requested User</li>
        <li className="flex justify-center">Status</li>
        <li className="flex justify-center">Borrowed date</li>
        <li className="flex justify-center">Return date</li>
        <li className="flex justify-center">Due Date</li>
        <li className="flex justify-center">Action</li>
      </ul>

      <ul>
        {body?.map((item) => (
          <BorrowedBooksList
            key={item.borrowedBooks.id}
            book={{ image: item.books.image, title: item.books.title }}
            user={{ fullname: item.users.fullName, email: item.users.email }}
            borrowedBook={item.borrowedBooks}
          />
        ))}
      </ul>
    </div>
  );
};

export default page;
