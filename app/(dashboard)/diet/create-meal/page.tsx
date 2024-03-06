"use client";

import React from "react";
import { CreateFoodForm, CreateFoodSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import ControlledInput from "@/components/ControlledInput";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

export default function Page() {
  const router = useRouter();

  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(CreateFoodSchema),
    mode: "onChange",
  });

  const addFood = async (data: CreateFoodForm) => {
    await fetch(`/api/food`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/diet/add-meal");
    router.refresh();
  };

  const isButtonActive = !formState.isValid;

  return (
    <div>
      <h1 className="text-3xl mb-6 mt-10">Create food</h1>
      <form onSubmit={handleSubmit(addFood)}>
        <ControlledInput
          className="mb-5"
          control={control}
          name="foodName"
          placeholder="Name"
          errorMessage={formState.errors.foodName?.message}
          color={formState.errors.foodName?.message ? "danger" : "default"}
        />
        <ControlledInput
          className="mb-5"
          control={control}
          name="energy"
          placeholder="Energy"
          endContent={<p>Kcal</p>}
          type="number"
          errorMessage={formState.errors.energy?.message}
          color={formState.errors.energy?.message ? "danger" : "default"}
        />
        <div className="flex gap-5 mb-5">
          <div className="flex w-full items-center gap-3">
            <ControlledInput
              control={control}
              name="proteins"
              placeholder="Proteins"
              endContent={<p>g</p>}
              type="number"
              errorMessage={formState.errors.proteins?.message}
              color={formState.errors.proteins?.message ? "danger" : "default"}
            />
          </div>
          <div className="flex w-full items-center gap-3">
            <ControlledInput
              control={control}
              name="fats"
              placeholder="Fats"
              endContent={<p>g</p>}
              type="number"
              errorMessage={formState.errors.fats?.message}
              color={formState.errors.fats?.message ? "danger" : "default"}
            />
          </div>
          <div className="flex w-full items-center gap-3">
            <ControlledInput
              control={control}
              name="carbohydrates"
              placeholder="Carbohydrates"
              endContent={<p>g</p>}
              type="number"
              errorMessage={formState.errors.carbohydrates?.message}
              color={
                formState.errors.carbohydrates?.message ? "danger" : "default"
              }
            />
          </div>
        </div>
        <Button
          isDisabled={isButtonActive}
          size="lg"
          type="submit"
          fullWidth
          color="success"
        >
          Create
        </Button>
      </form>
    </div>
  );
}
