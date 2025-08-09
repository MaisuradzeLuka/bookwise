"use client";

import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import CardModal from "./CardModal";
import Image from "next/image";
import { deleteUser, updateUser } from "@/actions/admin";
import { toast } from "sonner";
import RequestModal from "./RequestModal";
import DropDown from "./DropDown";
import { usersTable } from "@/database/schema";
import { usersRoles } from "@/constants";

type Props = {
  id: string;
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
  password: string;
  lastActivity: string | null;
  createdAt: Date | null;
  role: "admin" | "user";
};

const UserListCard = ({
  id,
  createdAt,
  universityId,
  universityCard,
  fullName,
  email,
  role,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    const res = await deleteUser(id);

    if (res.success) {
      toast.success(res.message);
      setIsOpen(false);
    } else {
      toast.error(res.message);
    }
  };

  const onSubmit = async (value: string) => {
    const res = await updateUser(id, value as "admin" | "user");

    if (res.success) {
      toast.success(res.message);
      setIsOpen(false);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <li className="grid grid-cols-8 items-center px-[10] py-4 rounded-sm mt-4">
      <div className="col-span-2 flex items-center gap-2">
        <Image
          width={40}
          height={40}
          src="/images/f1075b1e8f0df2d464c003934c69d99229bfd324.png"
          alt="profile image"
          className="w-10 h-10 object-cover rounded-full"
        />

        <div className="flex flex-col">
          <span className="text-[#1E293B] font-semibold">{fullName}</span>
          <span className="text-[#64748B]">{email}</span>
        </div>
      </div>

      <span className="flex justify-center text-[#3A354E] font-medium">
        {createdAt?.toJSON().slice(0, 10)}
      </span>

      <DropDown values={usersRoles} defaultValue={role} onSubmit={onSubmit} />

      <span className="flex justify-center text-[#3A354E] font-medium">10</span>

      <span className="flex justify-center text-[#3A354E] font-medium">
        {universityId}
      </span>

      <CardModal image={universityCard} />

      <RequestModal
        triggerIcon={<Trash2 className="w-5 h-5 text-[#EF3A4B]" />}
        variant="delete"
        onSubmit={onDelete}
        title="Do you want to delete this account?"
        btnText="Delete user"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </li>
  );
};

export default UserListCard;
