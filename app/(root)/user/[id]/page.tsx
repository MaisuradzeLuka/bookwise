import { getBooks, getBorrowedBooks } from "@/actions/books";
import { getUser } from "@/actions/user";
import { formatDateToMonthAndDay, getDueStatus } from "@/lib/utils";
import { Image } from "@imagekit/next";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUser(id);

  const { books } = await getBorrowedBooks(user?.id!);

  return (
    <div className="flex flex-col lg:flex-row gap-20 pb-10">
      <section className="userCard w-full max-w-[570px] h-max flex flex-col gap-9 rounded-[20px] mx-auto p-10">
        <div className="w-[60px] h-[90px] rounded-b-[100px] bg-[#464F6F] mx-auto -mt-14">
          <div className="w-10 h-[10] rounded-[40px] bg-[#1E2230] mx-auto mt-14" />
        </div>

        <div className="flex items-center gap-[6px]">
          <img
            src="/images/f1075b1e8f0df2d464c003934c69d99229bfd324.png"
            width={100}
            height={100}
            alt="user avatar"
            className="rounded-full object-cover"
          />

          <div>
            <h3 className="text-white text-2xl font-semibold">
              {user?.fullName}
            </h3>
            <p className="text-[#D6E0FF]">{user?.email}</p>
          </div>
        </div>

        <div>
          <h4 className="text-[#D6E0FF]">Member since</h4>
          <p className="text-white text-2xl font-semibold">
            {new Date(user?.createdAt!).toISOString().slice(0, 10)}
          </p>
        </div>

        <div>
          <h4 className="text-[#D6E0FF]">Student ID</h4>
          <p className="text-white text-2xl font-semibold">
            {user?.universityId}
          </p>
        </div>

        <Image
          src={user?.universityCard || ""}
          width={486}
          height={287}
          alt="university card"
          className="rounded-[10px]"
        />
      </section>

      <section className="flex-1">
        <h2 className="text-white text-2xl font-semibold mb-6">
          Borrowed Books
        </h2>

        {books?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
            {books?.map((book) => {
              const { books, borrowedBooks } = book;

              const dueState =
                borrowedBooks.status === "returned"
                  ? { status: "returned", message: "Returned" }
                  : getDueStatus(borrowedBooks.dueDate);

              return (
                <Link
                  href={`/books/${books.id}`}
                  key={books.id}
                  className="relative userCardBookCover flex flex-col gap-5 w-5/6 lg:w-[300px] xl:w-full mx-auto rounded-2xl p-5"
                >
                  <div
                    style={{ backgroundColor: books.cover }}
                    className="rounded-[10px] py-8"
                  >
                    <Image
                      src={books.image}
                      width={140}
                      height={200}
                      alt="book image"
                      className="w-[140px] h-[200px] object-cover mx-auto"
                    />
                  </div>

                  <h4 className="text-white text-[18px] font-semibold mb-[10px]">
                    {books.title} - By {books.author}
                  </h4>

                  <p className="text-[#D6E0FF] -mt-6 italic">{books.genre}</p>

                  <div className="flex justify-between items-end mt-auto">
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        <img src="/icons/book-2.svg" alt="book icon" />
                        <p className="text-[#D6E0FF]">
                          {formatDateToMonthAndDay(borrowedBooks.borrowDate)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <img
                          src={
                            dueState.status === "overdue"
                              ? "/icons/warning.svg"
                              : dueState.status === "returned"
                              ? "/icons/tick.svg"
                              : "/icons/calendar.svg"
                          }
                          alt="book icon"
                        />
                        <p
                          className={`${
                            dueState.status === "overdue"
                              ? "text-[#FF6C6F]"
                              : "text-[#D6E0FF]"
                          }`}
                        >
                          {dueState.message}
                        </p>
                      </div>
                    </div>

                    <button className="cursor-pointer">
                      <img
                        src="/icons/receipt.svg"
                        alt="receipt icon"
                        className="p-[4px] rounded-sm"
                        style={{ backgroundColor: books.cover }}
                      />
                    </button>
                  </div>

                  {dueState.status === "overdue" && (
                    <img
                      src="/icons/warning.svg"
                      alt="warning icon"
                      className="absolute -top-3 -left-4 w-8 h-8"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-white text-2xl mx-auto mt-40">
            There are no books to display
          </p>
        )}
      </section>
    </div>
  );
};

export default page;
