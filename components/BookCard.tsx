import { Image } from "@imagekit/next";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  image: string;
  title: string;
  author: string;
  genre: string;
  withText?: boolean;
};

const BookCard = ({
  id,
  image,
  title,
  author,
  genre,
  withText = true,
}: Props) => {
  return (
    <Link
      href={`/books/${id}`}
      key={id}
      className="w-full md:w-[144px] flex md:flex-col mx-auto gap-4"
    >
      <Image
        src={image}
        width={144}
        height={200}
        alt="book image"
        className="object w-[144px] h-[200px]"
      />

      {withText && (
        <div>
          <p className="text-white font-semibold mb-2">
            {title} - By {author}
          </p>

          <span className="text-[12px] text-[#D6E0FF]">{genre}</span>
        </div>
      )}
    </Link>
  );
};

export default BookCard;
