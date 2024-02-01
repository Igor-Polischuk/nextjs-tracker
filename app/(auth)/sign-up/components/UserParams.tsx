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
  setSex: (sex: string) => void;
  setActivityLevel: (activityLevel: string) => void;
  errors: Record<string, { message: string }>;
  trigger: (field: string) => Promise<boolean>
};

export default function UserParams({
  control,
  setSex,
  setActivityLevel,
  errors,
  trigger,
}: PropTypes) {
  const [sex, setSexValue] = useState($Enums.Sex.MALE);

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
            aria-label="sex"
            items={items}
            setValue={(value) => {
              setSexValue(value)
              setSex(value)
            }}
            value={sex}
            color="primary"
          />
        </div>
        <div className="flex flex-col w-full">
          Activity level:
          <Select
            aria-label="activity level"
            size="sm"
            placeholder="Select your activity level"
            className="w-full"
            color={errors.activityLevel ? "danger" : "default"}
            errorMessage={errors.activityLevel?.message}
            onChange={(e) => {
              setActivityLevel(e.target.value);
              trigger('activityLevel')
            }}
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
          aria-label="Height"
          control={control}
          name="height"
          label="Height in cm"
          type="number"
          color={errors.height ? "danger" : "default"}
          errorMessage={errors.height?.message}
        />
        <ControlledInput
          aria-label="weight"
          control={control}
          name="weight"
          label="Weight in kg"
          type="number"
          color={errors.weight ? "danger" : "default"}
          errorMessage={errors.weight?.message}
        />
        <ControlledInput
          control={control}
          aria-label="age"
          name="age"
          label="Age"
          type="number"
          color={errors.age ? "danger" : "default"}
          errorMessage={errors.age?.message}
        />
      </div>
    </div>
  );
}
