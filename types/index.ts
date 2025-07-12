import { DefaultValues, FieldValues } from "react-hook-form";
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
  universityId: number;
  universityCard: string;
};
