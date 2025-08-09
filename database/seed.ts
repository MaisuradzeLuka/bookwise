import dummyBooks from "../dummybooks.json";
import ImageKit from "imagekit";
import { booksTable } from "@/database/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DB_CONNECTION_URL!);
export const db = drizzle({ client: sql });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });

    return response.filePath;
  } catch (error) {
    console.error("Error uploading image to ImageKit:", error);
  }
};

const seed = async () => {
  console.log("Seeding data...");

  try {
    for (const book of dummyBooks) {
      const image = (await uploadToImageKit(
        book.image,
        `${book.title}.jpg`,
        "/books/images"
      )) as string;

      const video = (await uploadToImageKit(
        book.video,
        `${book.title}.mp4`,
        "/books/videos"
      )) as string;

      await db.insert(booksTable).values({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        rating: String(book.rating),
        cover: book.cover,
        description: book.description,
        totalCoppies: book.totalCoppies,
        availableCoppies: book.availableCoppies,
        summary: book.summary,
        image: image,
        video: video,
      });
    }

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seed();
