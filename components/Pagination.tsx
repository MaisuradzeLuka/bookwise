"use client";

import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationComp = ({
  page,
  booksLength,
}: {
  page?: string;
  booksLength: number;
}) => {
  const router = useRouter();
  const [pageValue, setPageValue] = useState(page ? +page : 1);

  const isMoreBooks = booksLength === 12;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;

    const searchParams = new URLSearchParams(window.location.search);

    searchParams.delete("page");

    searchParams.append("page", value);

    setPageValue(+value);

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname, { scroll: false });
  };

  return (
    <nav className="flex justify-end mt-12 border-t pt-10 border-[#23283980] text-white">
      <div className="flex items-center gap-2">
        <Button
          disabled={pageValue - 1 <= 0}
          value={pageValue - 1}
          onClick={(e) => handleClick(e)}
          className="flex items-center justify-center w-12 h-12 rounded-sm bg-[#232839] hover:bg-[#ffe1bdd0]  text-md cursor-pointer"
        >
          <ChevronLeft />
        </Button>

        {pageValue - 1 > 0 && (
          <Button
            value={pageValue - 1}
            onClick={(e) => handleClick(e)}
            className="flex items-center justify-center w-12 h-12 rounded-sm bg-[#232839] hover:bg-[#ffe1bdd0] text-md cursor-pointer"
          >
            {pageValue - 1}
          </Button>
        )}

        <Button
          value={pageValue}
          onClick={(e) => handleClick(e)}
          className="flex items-center justify-center w-12 h-12 rounded-sm bg-[#FFE1BD] hover:bg-[#ffe1bdd0] text-[#232839] text-md cursor-pointer"
        >
          {pageValue}
        </Button>

        {isMoreBooks && (
          <Button
            value={pageValue + 1}
            onClick={(e) => handleClick(e)}
            className="flex items-center justify-center w-12 h-12 rounded-sm bg-[#232839] hover:bg-[#ffe1bdd0]  text-md cursor-pointer"
          >
            {pageValue + 1}
          </Button>
        )}

        <Button
          disabled={!isMoreBooks}
          value={pageValue + 1}
          onClick={(e) => handleClick(e)}
          className="flex items-center justify-center w-12 h-12 rounded-sm bg-[#232839] hover:bg-[#ffe1bdd0]  text-md cursor-pointer"
        >
          <ChevronRight />
        </Button>
      </div>
    </nav>
  );
};

export default PaginationComp;
