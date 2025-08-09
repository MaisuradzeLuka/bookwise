import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@radix-ui/react-dialog";
import { DialogOverlay, DialogPortal } from "../ui/dialog";

import { Image } from "@imagekit/next";
import { X } from "lucide-react";

const CardModal = ({ image }: { image: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex justify-center border-none shadow-none text-[#0089F1] font-medium cursor-pointer p-0 mx-auto">
          View ID Card
        </span>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" />

        <DialogContent className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-2">
          <DialogTitle className="hidden" />

          <div className="relative w-max mx-auto">
            <Image
              src={image}
              width={400}
              height={250}
              alt="id card image"
              className="w-[1000px] object-cover"
            />

            <DialogClose className="absolute text-red-500 top-8 cursor-pointer right-10">
              <X />
            </DialogClose>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default CardModal;
