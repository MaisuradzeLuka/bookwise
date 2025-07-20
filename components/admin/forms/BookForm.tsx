"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { bookSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadFile from "@/components/UploadFile";
import { Textarea } from "@/components/ui/textarea";
import ColorPicker from "../ColorPicker";
import { addBook } from "@/actions/admin";

type Props = {
  type?: string;
};

const BookForm = ({ type }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      description: "",
      totalCoppies: 1,
      image: "",
      rating: 1,
      cover: "",
      video: "",
      summary: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof bookSchema>) => {
    setIsLoading(true);
    const bookFields = {
      ...values,
      rating: values.rating.toString(),
      availableCoppies: values.totalCoppies,
    };

    const newBook = await addBook(bookFields);

    if (newBook.success) {
      toast.success(newBook.message);
      router.push(`/admin/allbooks/${newBook.body}`);
    }
    if (!newBook.success) toast.error(newBook.message);

    setIsLoading(false);
  };

  return (
    <div className="max-w-[800px] flex flex-col gap-8 mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F172A] text-[16px]">
                  Book Title
                </FormLabel>

                <FormControl>
                  <Input
                    required
                    type="text"
                    className="bg-[#F9FAFB] px-5 py-6 rounded-[5px] !ring-0 border !border-[#CBD5E1] text-[16px]"
                    placeholder="Enter the book title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F172A] text-[16px]">
                  Author
                </FormLabel>

                <FormControl>
                  <Input
                    required
                    type="text"
                    className="bg-[#F9FAFB] px-5 py-6 rounded-[5px] !ring-0 border !border-[#CBD5E1] text-[16px]"
                    placeholder="Enter the author name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F172A] text-[16px]">
                  Genre
                </FormLabel>

                <FormControl>
                  <Input
                    required
                    type="text"
                    className="bg-[#F9FAFB] px-5 py-6 rounded-[5px] !ring-0 border !border-[#CBD5E1] text-[16px]"
                    placeholder="Enter the genre of the book"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F172A] text-[16px]">
                  Book Description
                </FormLabel>

                <FormControl>
                  <Textarea
                    required
                    rows={5}
                    className="bg-[#F9FAFB] px-5 py-6 rounded-[5px] !ring-0 border !border-[#CBD5E1] text-[16px] h-[250px] overflow-y-scroll hide-scrollbar"
                    placeholder="Write a brief description of the book"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F172A] text-[16px]">
                  Book Rating
                </FormLabel>

                <FormControl>
                  <Input
                    required
                    type="text"
                    className="bg-[#F9FAFB] px-5 py-6 rounded-[5px] !ring-0 border !border-[#CBD5E1] text-[16px]"
                    placeholder="Enter the rating of the book (1-5)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalCoppies"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F172A] text-[16px]">
                  Total number of books
                </FormLabel>

                <FormControl>
                  <Input
                    required
                    type="text"
                    className="bg-[#F9FAFB] px-5 py-6 rounded-[5px] !ring-0 border !border-[#CBD5E1] text-[16px]"
                    placeholder="Enter the total number of books"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F172A] text-[16px]">
                  Book Image
                </FormLabel>

                <FormControl>
                  <UploadFile
                    onFileChange={field.onChange}
                    accept="image/*"
                    type="image"
                    variant="light"
                    folder="books/images"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F172A] text-[16px]">
                  Book Primary Color
                </FormLabel>

                <FormControl>
                  <ColorPicker onColorChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F172A] text-[16px]">
                  Book Video
                </FormLabel>

                <FormControl>
                  <UploadFile
                    onFileChange={field.onChange}
                    accept="video/*"
                    type="video"
                    variant="light"
                    folder="books/videos"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F172A] text-[16px]">
                  Book Summary
                </FormLabel>

                <FormControl>
                  <Textarea
                    required
                    rows={5}
                    className="bg-[#F9FAFB] px-5 py-6 rounded-[5px] !ring-0 border !border-[#CBD5E1] text-[16px] h-[250px] overflow-y-scroll hide-scrollbar"
                    placeholder="Write a summary of the book"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary-blue text-white font-bold cursor-pointer"
          >
            Add book
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookForm;
