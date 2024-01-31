import ControlledInput from "@/components/ControlledInput";
import { Button } from "@nextui-org/button";
import { Food } from "@prisma/client";
import React from "react";
import { Control } from "react-hook-form";

type PropTypes = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  control: Control<any>;
  selectedFood: Food | null;
  resetSelectedFood: () => void;
  setShowFoodList: (value: boolean) => void;
};

export default function AddNutritionForm({
  control,
  onSubmit,
  resetSelectedFood,
  selectedFood,
  setShowFoodList,
}: PropTypes) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 pt-24">
      <h1 className="text-5xl">Create meal</h1>
      <div className="flex gap-5 items-center">
        <ControlledInput
          control={control}
          name="foodName"
          disabled={!!selectedFood}
          label="Meal name"
          placeholder=" "
          type="text"
        />

        {!selectedFood ? (
          <Button
            className=""
            size="lg"
            color="primary"
            onClick={() => setShowFoodList(true)}
          >
            Choose from list
          </Button>
        ) : (
          <Button
            className=""
            size="lg"
            color="danger"
            onClick={resetSelectedFood}
          >
            Clear
          </Button>
        )}
      </div>
      <ControlledInput
        control={control}
        name="energy"
        disabled={!!selectedFood}
        label="Product energy"
        placeholder=" "
        type="number"
      />
      <div className="flex gap-4">
        <ControlledInput
          control={control}
          name="proteins"
          disabled={!!selectedFood}
          label="Proteins"
          placeholder=" "
          type="number"
        />
        <ControlledInput
          control={control}
          name="fats"
          disabled={!!selectedFood}
          label="Fats"
          placeholder=" "
          type="number"
        />
        <ControlledInput
          control={control}
          name="carbohydrates"
          disabled={!!selectedFood}
          label="Carbohydrates"
          placeholder=" "
          type="number"
        />
      </div>
      <ControlledInput
        control={control}
        name="amount"
        label="Amount"
        type="number"
      />
      <Button color="success" type="submit" variant="shadow">
        Save
      </Button>
    </form>
  );
}
