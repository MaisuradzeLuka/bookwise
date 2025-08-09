import { getUsers } from "@/actions/admin";
import UserListCard from "@/components/admin/UserListCard";
import React from "react";

const page = async () => {
  const { body } = await getUsers();

  return (
    <div className="bg-white rounded-2xl w-full p-5">
      <div className="flex justify-between items-center">
        <h3 className="text-[#1E293B]  text-xl font-semibold">All Users</h3>
      </div>

      <ul className="grid grid-cols-8 bg-[#F8F8FF] text-[#3A354E] px-[10] py-4 rounded-sm mt-4">
        <li className="col-span-2">Name</li>
        <li className="flex justify-center">Date Joined</li>
        <li className="flex justify-center">Role</li>
        <li className="flex justify-center">Books Borrowed</li>
        <li className="flex justify-center">University ID No </li>
        <li className="flex justify-center">University ID Card </li>
        <li className="flex justify-center">Action</li>
      </ul>

      <ul>
        {body?.map((item) => (
          <UserListCard key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default page;
