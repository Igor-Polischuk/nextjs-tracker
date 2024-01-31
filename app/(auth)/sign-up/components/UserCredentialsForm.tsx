import ControlledInput from "@/components/ControlledInput";
import React from "react";
import { Control } from "react-hook-form";

type PropTypes = {
  control: Control<any>;
};

export default function UserCredentialsForm({ control }: PropTypes) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <ControlledInput
          control={control}
          name="firstName"
          type="text"
          label="First name"
        />
        <ControlledInput
          control={control}
          name="lastName"
          type="text"
          label="Last name"
        />
      </div>
      <ControlledInput
        control={control}
        name="username"
        type="text"
        label="Username"
      />
      <ControlledInput
        control={control}
        name="password"
        type="text"
        label="Password"
      />
    </div>
  );
}
