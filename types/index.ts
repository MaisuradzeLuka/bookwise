import { FieldValues } from "react-hook-form";
import { ZodType } from "zod";

export type AuthFormType<T extends FieldValues> = {
  type: "sign-in" | "sign-up";
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; message?: string }>;
};

export type Credentials = {
  fullname: string;
  email: string;
  password: string;
  universityId: string | number;
  universityCard: string;
};

export type BookFields = {
  availableCoppies: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  totalCoppies: number;
  rating: string;
  image: string;
  cover: string;
  summary: string;
  video?: string | undefined;
};

export type BookTypes = {};
