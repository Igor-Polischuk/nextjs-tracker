import ControlledInput from "@/components/ControlledInput";
import RadioTabs from "@/components/RadioTabs";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { $Enums, ActivityLevel } from "@prisma/client";
import React, { useState } from "react";
import { Control } from "react-hook-form";

const activityLevelSelectItems = Object.keys(ActivityLevel).map((key) => {
  const label = key.toLocaleLowerCase().split("_").join(" ");
  return {
    label,
    value: key,
  };
});

type PropTypes = {
  control: Control<any>;
};

export default function UserParams({ control }: PropTypes) {
  const [sex, setSex] = useState($Enums.Sex.MALE);
  console.log(sex);
  const items = [
    {
      title: "Male",
      value: $Enums.Sex.MALE,
    },
    {
      title: "Female",
      value: $Enums.Sex.FEMALE,
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-stretch gap-5">
        <div className="flex flex-col">
          Sex:
          <RadioTabs
            items={items}
            setValue={setSex}
            value={sex}
            color="primary"
          />
        </div>
        <div className="flex flex-col w-full">
          Activity level:
          <Select
            size="sm"
            placeholder="Select your activity level"
            className="w-full"
            renderValue={(items) => {
              return items.map((item) => (
                <p key={item.key} className="capitalize">
                  {item.textValue}
                </p>
              ));
            }}
          >
            {activityLevelSelectItems.map((activityLevel) => (
              <SelectItem
                className="capitalize"
                key={activityLevel.value}
                value={activityLevel.value}
              >
                {activityLevel.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <ControlledInput
          control={control}
          name="height"
          label="Height in cm"
          type="number"
        />
        <ControlledInput
          control={control}
          name="weight"
          label="Weight in kg"
          type="number"
        />
        <ControlledInput
          control={control}
          name="age"
          label="Age"
          type="number"
        />
      </div>
    </div>
  );
}
