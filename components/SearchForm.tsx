"use client";

import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SearchForm = () => {
  const router = useRouter();

  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);

    searchParams.delete("filter");

    if (value.trim().length) {
      searchParams.append("filter", value.trim());
    } else {
      searchParams.delete("filter");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname, { scroll: false });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full flex items-center gap-2 p-5 rounded-[10px] bg-[#232839] mt-8"
    >
      <button type="submit" className="cursor-pointer">
        <Image
          src="/icons/search-fill.svg"
          width={28}
          height={28}
          alt="search icon"
        />
      </button>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        className="w-full outline-0 text-white text-xl font-semibold"
        placeholder="Search books..."
      />
    </form>
  );
};

export default SearchForm;
