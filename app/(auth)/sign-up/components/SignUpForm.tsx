"use client";

import Stepper, { StepperPage } from "@/components/Stepper";
import React from "react";
import { useForm } from "react-hook-form";
import UserCredentialsForm from "./UserCredentialsForm";
import UserParams from "./UserParams";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { CreateUserSchema, SignUpUser } from "../schema";
import { $Enums } from "@prisma/client";

export default function SignUpForm() {
  const signUpForm = useForm({
    resolver: yupResolver(CreateUserSchema),
    mode: "onChange",
    defaultValues: {
      sex: $Enums.Sex.MALE,
    },
  });

  // console.log(signUpForm.watch());

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
  console.log(signUpForm.formState.errors);
  const registerUser = (userData: SignUpUser) => {
    console.log(signUpForm.formState.isValid);
    console.log(userData);
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
