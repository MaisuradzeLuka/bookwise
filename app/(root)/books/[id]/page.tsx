import { getBooks, getSingleBook } from "@/actions/books";
import BookCard from "@/components/BookCard";
import Overwiev from "@/components/Overwiev";
import { BookTypes } from "@/types";
import { Video } from "@imagekit/next";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: bookId } = await params;

  const res = await getSingleBook(bookId);

  const book = res?.book;
  const books = await getBooks(book?.genre, 7);

  return (
    <>
      <Overwiev book={book as BookTypes} />

      <section className="flex flex-col w-full lg:flex-row gap-40 mt-24 pb-10">
        <div className="flex-1">
          {book?.video && (
            <div>
              <h3 className="text-3xl text-[#D6E0FF] font-semibold mb-6">
                Video
              </h3>

              <Video
                src={book.video}
                controls
                className="w-full h-auto mb-15"
                // poster="https://ik.imagekit.io/your_imagekit_id/preview.jpg"
              >
                Your browser does not support the video tag.
              </Video>
            </div>
          )}

          <div>
            <h3 className="text-3xl text-[#D6E0FF] font-semibold mb-6">
              Summary
            </h3>

            <p className="text-xl text-[#D6E0FF]">{book?.summary}</p>
          </div>
        </div>

        <div className="w-full lg:w-[500px]">
          <h3 className="text-3xl text-[#D6E0FF] font-semibold mb-6">
            More Similar Books
          </h3>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
            {books?.books?.slice(0, 6).map((book) => (
              <div key={book.id} className="mx-auto">
                <BookCard withText={false} {...book} key={book.id} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
