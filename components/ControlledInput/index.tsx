import { InputProps, Input } from "@nextui-org/input";
import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";

type PropType = {
  control: Control<any>;
  name: string;
} & InputProps;

const ControlledInput: FC<PropType> = ({
  control,
  name,
  ...rest
}: PropType) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Input {...field} {...rest} />}
    />
  );
};

export default ControlledInput;
