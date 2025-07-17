import z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signUpSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  universityId: z.coerce
    .number({ message: "University ID must contain only numbers" })
    .refine((val) => val.toString().length === 8, {
      message: "University ID must be 8 digits",
    }),
  universityCard: z
    .string()
    .nonempty({ message: "University card is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const bookSchema = z.object({
  title: z.string().min(2).max(100),
  author: z.string().min(2).max(100),
  genre: z.string().min(2).max(255),
  description: z.string().min(10).max(400),
  totalCoppies: z.coerce.number().min(1).max(1000),
  image: z.string().nonempty(),
  cover: z.string().nonempty(),
  video: z.string().optional(),
  summary: z.string().min(10).max(1000),
});
