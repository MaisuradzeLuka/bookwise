import { getBooks } from "@/actions/books";
import { getUser } from "@/actions/user";
import { Image } from "@imagekit/next";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUser(id);

  const books = await getBooks();

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
          {books?.books?.map((book) => {
            return (
              <div
                key={book.id}
                className="userCardBookCover flex flex-col gap-5 w-5/6 lg:w-[300px] xl:w-full mx-auto rounded-2xl p-5"
              >
                <div
                  style={{ backgroundColor: book.cover }}
                  className="rounded-[10px]"
                >
                  <Image
                    src={book.image}
                    width={140}
                    height={200}
                    alt="book image"
                    className="w-[140px] h-[200px] object-cover mx-auto"
                  />
                </div>

                <h4 className="text-white text-[18px] font-semibold mb-[10px]">
                  {book.title} - By {book.author}
                </h4>

                <p className="text-[#D6E0FF] -mt-6">{book.genre}</p>

                <div className="flex justify-between items-end mt-auto">
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <img src="/icons/book-2.svg" alt="book icon" />
                      <p className="text-[#D6E0FF]">Borrowed on</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <img src="/icons/book-2.svg" alt="book icon" />
                      <p className="text-[#D6E0FF]">borrowed on</p>
                    </div>
                  </div>

                  <button className="cursor-pointer">
                    <img
                      src="/icons/receipt.svg"
                      alt="receipt icon"
                      className="p-[4px] rounded-sm"
                      style={{ backgroundColor: book.cover }}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default page;
