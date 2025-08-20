import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@radix-ui/react-dialog";

import { Button } from "../ui/button";
import { Dispatch, ReactNode, SetStateAction } from "react";
import Image from "next/image";
import { DialogDescription } from "../ui/dialog";

type Props = {
  variant: "delete" | "approve";
  triggerIcon: ReactNode;
  onSubmit: () => Promise<void>;
  title: string;
  description?: string;
  btnText: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const RequestModal = ({
  variant,
  triggerIcon,
  onSubmit,
  title,
  description,
  btnText,
  isOpen,
  setIsOpen,
}: Props) => {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button
          variant="outline"
          className=" flex justify-center border-none shadow-none text-[#0089F1] font-medium cursor-pointer p-0"
        >
          {triggerIcon}
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" />

        <DialogContent className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[500px] rounded-xl p-6 flex flex-col items-center gap-3">
          <div
            className={` my-4 p-6 rounded-full  ${
              variant === "delete"
                ? "bg-[#F46F70] shadow-[0_0_0px_15px_#f46f6f4d]"
                : "bg-[#4C7B62]  shadow-[0_0_0px_15px_#4c7b627c] "
            }`}
          >
            <Image
              src={
                variant === "delete"
                  ? "/icons/admin/info.svg"
                  : "/icons/admin/tick.svg"
              }
              width={30}
              height={30}
              alt="warning icon"
            />
          </div>

          <DialogTitle className="text-[#1E293B] font-semibold text-xl mt-3">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription className="text-[#64748B] text-center">
              {description}
            </DialogDescription>
          )}

          <Button
            onClick={onSubmit}
            className={`w-full h-[52px] rounded-xl text-[#F8FAFC] font-bold text-[16px] mt-4 cursor-pointer ${
              variant === "delete" ? " bg-[#F46F70]" : "bg-[#4C7B62]"
            }`}
          >
            {btnText}
          </Button>

          <DialogClose
            className="absolute right-6 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/icons/admin/close.svg"
              width={24}
              height={24}
              alt="close button"
            />
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default RequestModal;
