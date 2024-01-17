"use client";

import { Button } from "@nextui-org/button";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateMealForm, CreateMealSchema } from "./schema";
import { Food } from "@prisma/client";
import FoodList from "./FoodList";
import ControlledInput from "@/components/ControlledInput";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [showFoodList, setShowFoodList] = useState(false);
  const [foodList, setFoodList] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<null | Food>(null);
  const { handleSubmit, setValue, watch, control } = useForm({
    resolver: yupResolver(CreateMealSchema),
    mode: "onChange",
  });
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/food`)
      .then((res) => res.json())
      .then(setFoodList);
  }, []);

  const setFoodFromList = (food: Food) => {
    setShowFoodList(false);
    setValue("foodName", food.foodName);
    setValue("carbohydrates", food.carbohydrates);
    setValue("energy", food.calories);
    setValue("proteins", food.proteins);
    setValue("fats", food.fats);
    setSelectedFood(food);
  };

  const resetSelectedFood = () => {
    setSelectedFood(null);
    setValue("foodName", "");
    setValue("carbohydrates", 0);
    setValue("energy", 0);
    setValue("proteins", 0);
    setValue("fats", 0);
  };

  const addNutrition = async (data: CreateMealForm) => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nutrition`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/diet");
  };

  return (
    <section>
      {!showFoodList ? (
        <form
          onSubmit={handleSubmit(addNutrition)}
          className="flex flex-col gap-6 pt-24"
        >
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
      ) : (
        <div>
          <Input label="Search by name" />
          <FoodList foodList={foodList} setFood={setFoodFromList} />
          <Button
            size="lg"
            color="primary"
            variant="shadow"
            className="w-full mb-auto"
            onClick={() => setShowFoodList(false)}
          >
            Go back
          </Button>
        </div>
      )}
    </section>
  );
}
