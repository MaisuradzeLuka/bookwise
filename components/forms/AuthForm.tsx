"use client";

import React from "react";
import Link from "next/link";
import {
  DefaultValues,
  FieldValues,
  Path,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { AuthFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { formFields, formFieldTypes } from "@/constants";
import UploadImage from "../UploadImage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormType<T>) => {
  const router = useRouter();

  const form: UseFormReturn<T> = useForm({
    // resolver: zodResolver(schema as any),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const submitHandler = async (values: T) => {
    const res = await onSubmit(values);

    console.log(res);

    if (res.success) {
      toast.success(
        type === "sign-in" ? "Signed in successfuly" : "Signed up successfuly"
      );
      // router.push("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold">
          {type === "sign-in"
            ? "Welcome Back to the BookWise"
            : "Create Your Library Account"}
        </h2>

        <p className="text-lg text-[#D6E0FF] mt-3">
          {type === "sign-in"
            ? "Access the vast collection of resources, and stay updated"
            : "Please complete all fields and upload a valid university ID to gain access to the library"}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="flex flex-col gap-4"
        >
          {Object.keys(defaultValues).map((key) => {
            return (
              <FormField
                key={key}
                control={form.control}
                name={key as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#D6E0FF] text-[16px]">
                      {formFields[key as keyof typeof formFields]}
                    </FormLabel>

                    <FormControl>
                      {key === "universityCard" ? (
                        <UploadImage onFileChange={field.onChange} />
                      ) : (
                        <Input
                          required
                          type={
                            formFieldTypes[key as keyof typeof formFieldTypes]
                          }
                          className="bg-[#232839] px-5 py-6 rounded-[5px] !ring-0 border-0 text-[16px]"
                          {...field}
                        />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            );
          })}

          <Button
            className="bg-primary-100 text-[#14171C] py-6 cursor-pointer"
            type="submit"
          >
            {type === "sign-in" ? "LogIn" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="mx-auto text-[#D6E0FF]">
        {type === "sign-in" ? (
          <>
            Don't have an acoount?{" "}
            <Link href="/sign-up" className="text-primary-100 cursor-pointer">
              Register here
            </Link>
          </>
        ) : (
          <>
            Have an account already?{" "}
            <Link href="/sign-in" className="text-primary-100 cursor-pointer">
              LogIn
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
