"use client";

import Stepper, { StepperPage } from "@/components/Stepper";
import React from "react";
import { useForm } from "react-hook-form";
import UserCredentialsForm from "./UserCredentialsForm";
import UserParams from "./UserParams";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { CreateUserSchema, SignUpUserForm } from "../schema";
import { $Enums } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const signUpForm = useForm({
    resolver: yupResolver(CreateUserSchema),
    mode: "onChange",
    defaultValues: {
      sex: $Enums.Sex.MALE,
    },
  });

  const setSex = (sex: string) => {
    signUpForm.setValue("sex", sex);
  };

  const setActivityLevel = (sex: string) => {
    signUpForm.setValue("activityLevel", sex);
  };

  const pages: StepperPage[] = [
    {
      element: (
        <UserCredentialsForm
          control={signUpForm.control}
          errors={
            signUpForm.formState.errors as Record<string, { message: string }>
          }
        />
      ),
    },
    {
      element: (
        <UserParams
          control={signUpForm.control}
          setActivityLevel={setActivityLevel}
          setSex={setSex}
          trigger={signUpForm.trigger as (field: string) => Promise<boolean>}
          errors={
            signUpForm.formState.errors as Record<string, { message: string }>
          }
        />
      ),
    },
  ];

  const registerUser = async (userData: SignUpUserForm) => {
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      return;
    }

    router.push("/sign-in");
  };

  return (
    <form onSubmit={signUpForm.handleSubmit(registerUser)}>
      <Stepper
        onFinish={() => {}}
        pages={pages}
        title="Sign up"
        finishButtonText="Sign in"
        finishButtonProps={{
          type: "submit",
        }}
      />
    </form>
  );
}
