import { DefaultValues, FieldValues } from "react-hook-form";
import { ZodType } from "zod";

export type AuthFormType<T extends FieldValues> = {
  type: "sign-in" | "sign-up";
  schema: ZodType<T>;
  defaultValues: T;
};
