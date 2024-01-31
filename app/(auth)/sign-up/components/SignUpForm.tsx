"use client";

import ControlledInput from "@/components/ControlledInput";
import Stepper, { StepperPage } from "@/components/Stepper";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React from "react";
import { useForm } from "react-hook-form";
import UserCredentialsForm from "./UserCredentialsForm";
import UserParams from "./UserParams";

export default function SignUpForm() {
  const signUpForm = useForm();

  const pages: StepperPage[] = [
    {
      element: <UserCredentialsForm control={signUpForm.control}/>,
    },
    {
      element: <UserParams control={signUpForm.control}/>
    },
  ];

  return (
    <Stepper onFinish={() => {}} pages={pages} title='Sign up'/>
  );
}
