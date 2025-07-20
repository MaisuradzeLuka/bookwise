import { BookTypes } from "@/types";
import React from "react";
import BorrowBook from "./BorrowBook";
import { auth } from "@/auth";
import { Image } from "@imagekit/next";

const Overwiev = async ({ book }: { book: BookTypes }) => {
  const user = await auth();

  const userId = user?.user?.id!;

  return (
    <section className=" flex flex-col-reverse md:flex-row justify-between gap-18 lg:gap-30 text-white">
      <div className="mt-80 md:mt-0 px- flex-1 flex flex-col gap-6 text-[#D6E0FF]">
        <h2 className="text-white text-[56px] font-semibold">{book?.title}</h2>

        <div className="text-[20px]">
          <div className="flex items-center flex-wrap gap-5">
            <p>
              By <span className="text-primary-100">{book?.author}</span>
              {"  "}
            </p>

            <p>
              Category <span className="text-primary-100">{book?.genre}</span>
            </p>

            <p className="flex gap-1">
              <img src="/icons/star.svg" width={22} height={22} alt="rating" />
              <span>
                {" "}
                <span className="text-primary-100">{book?.rating}</span>
                /5
              </span>
            </p>
          </div>

          <div className="flex items-center gap-5">
            <p>
              Total books:{" "}
              <span className="text-primary-100">{book?.totalCoppies} </span>
            </p>

            <p>
              Available books{" "}
              <span className="text-primary-100">{book?.availableCoppies}</span>
            </p>
          </div>
        </div>

        <p className="text-[20px]">{book?.description}</p>

        <BorrowBook userId={userId} {...book} />
      </div>

      <div className="relative w-full md:w-[500px]">
        <Image
          src={book?.image || ""}
          width={250}
          height={380}
          alt="book image"
          className="absolute left-13 top-10 rotate-12 opacity-70 object-cover h-[380px] w-[250px]"
        />

        <Image
          src={book?.image || ""}
          width={250}
          height={380}
          alt="book image"
          className="absolute object-cover h-[380px] w-[250px]"
        />
      </div>
    </section>
  );
};

export default Overwiev;
