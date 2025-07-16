"use client";

import { signUpWithCredentials } from "@/actions/auth";
import AuthForm from "@/components/forms/AuthForm";
import { signUpSchema } from "@/lib/validation";
import Image from "next/image";
import React from "react";

const page = () => {
  const defaultValues = {
    fullname: "",
    email: "",
    password: "",
    universityId: 0,
    universityCard: "",
  };

  return (
    <main className="authForm max-h-[95%] overflow-y-scroll hide-scrollbar mx-auto w-full flex flex-col sm:w-[586px] p-10 rounded-[20px] gap-8">
      <h1 className="flex items-center gap-2">
        <Image src="/icons/logo.svg" width={40} height={40} alt="logo" />
        <span className="text-2xl font-semibold">BookWise</span>
      </h1>

      <AuthForm
        type="sign-up"
        schema={signUpSchema}
        defaultValues={defaultValues}
        onSubmit={signUpWithCredentials}
      />
    </main>
  );
};

export default page;
