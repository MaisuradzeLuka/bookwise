import { getBooks, getSingleBook } from "@/actions/books";
import BookCard from "@/components/BookCard";
import Overwiev from "@/components/Overwiev";
import { BookFields } from "@/types";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: bookId } = await params;

  const res = await getSingleBook(bookId);

  const book = res?.book;
  const books = await getBooks(book?.genre);

  return (
    <>
      <Overwiev book={book as BookFields} />

      <section className="flex flex-col w-full lg:flex-row gap-40 mt-24 pb-10">
        <div className="flex-1">
          {book?.video && (
            <div>
              <h3 className="text-3xl text-[#D6E0FF] font-semibold mb-6">
                Video
              </h3>
            </div>
          )}

          <div>
            <h3 className="text-3xl text-[#D6E0FF] font-semibold mb-6">
              Summary
            </h3>

            <p className="text-xl text-[#D6E0FF]">{book?.summary}</p>
          </div>
        </div>

        <div className="w-full md:w-[500px]">
          <h3 className="text-3xl text-[#D6E0FF] font-semibold mb-6">
            More Similar Books
          </h3>

          <div className="flex flex-wrap gap-2">
            {books?.books?.slice(0, 6).map((book) => (
              <BookCard withText={false} {...book} key={book.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
