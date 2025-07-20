import { getBooks } from "@/actions/books";
import { auth } from "@/auth";
import BookCard from "@/components/BookCard";
import Overwiev from "@/components/Overwiev";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { BookFields } from "@/types";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { after } from "next/server";

const page = async () => {
  const session = await auth();

  const books = await getBooks();

  const mostRecent = books?.books![0];

  after(async () => {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session?.user?.id!))
      .limit(1);

    if (user[0].lastActivity === new Date().toISOString().slice(0, 10)) {
      return;
    }

    await db
      .update(usersTable)
      .set({ lastActivity: new Date().toISOString().slice(0, 10) })
      .where(eq(usersTable.id, session?.user?.id!));
  });

  return (
    <>
      <Overwiev book={mostRecent as BookFields} />

      <section className="pb-20">
        <h2 className="text-white text-[32px] font-semibold mt-20">
          Popular Books
        </h2>

        <div className="w-ful flex flex-col sm:flex-row flex-wrap items-center justify-between mt-12">
          {books?.books?.slice(0, 5).map((book) => (
            <BookCard {...book} key={book.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
