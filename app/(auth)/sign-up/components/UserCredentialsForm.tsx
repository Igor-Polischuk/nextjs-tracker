import ControlledInput from "@/components/ControlledInput";
import React from "react";
import { Control } from "react-hook-form";

type PropTypes = {
  control: Control<any>;
  errors: Record<string, { message: string }>;
};

export default function UserCredentialsForm({ control, errors }: PropTypes) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <ControlledInput
          aria-label="first name"
          control={control}
          name="firstName"
          type="text"
          label="First name"
          color={errors.firstName ? "danger" : "default"}
          errorMessage={errors.firstName?.message}
        />
        <ControlledInput
          aria-label="last name"
          control={control}
          name="lastName"
          type="text"
          label="Last name"
          color={errors.lastName ? "danger" : "default"}
          errorMessage={errors.lastName?.message}
        />
      </div>
      <ControlledInput
        aria-label="username"
        control={control}
        name="username"
        type="text"
        label="Username"
        color={errors.username ? "danger" : "default"}
        errorMessage={errors.username?.message}
      />
      <ControlledInput
        aria-label="password"
        control={control}
        name="password"
        type="password"
        label="Password"
        color={errors.password ? "danger" : "default"}
        errorMessage={errors.password?.message}
      />
    </div>
  );
}
