import z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signUpSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  universityId: z.number(),
  password: z.string().min(6),
});
