import { getBooks } from "@/actions/books";
import BookCard from "@/components/BookCard";
import PaginationComp from "@/components/Pagination";
import SearchForm from "@/components/SearchForm";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string; page: string }>;
}) => {
  const { filter, page } = await searchParams;

  const res = await getBooks(filter, 12, +page);

  const books = res.books;

  return (
    <>
      <section className="flex flex-col items-center w-full max-w-[640px] text-center mx-auto">
        <p className="text-[#D6E0FF]">DISCOVER YOUR NEXT GREAT READ:</p>

        <h2 className="text-3xl md:text-[56px] text-white font-semibold">
          Explore and Search for
          <span className="text-primary-100">Any Book</span> In Our Library
        </h2>

        <SearchForm />
      </section>

      <section className="w-full mt-20 pb-10">
        <h4 className="text-3xl text-[#D6E0FF] mb-12">Search Results</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-12">
          {books?.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>

        <PaginationComp page={page} booksLength={books?.length || 0} />
      </section>
    </>
  );
};

export default page;
