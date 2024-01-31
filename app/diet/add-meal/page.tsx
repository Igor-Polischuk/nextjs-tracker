"use client";

import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateMealForm, CreateMealSchema } from "./schema";
import { Food } from "@prisma/client";
import { useRouter } from "next/navigation";
import SavedFood from "./components/SavedFood";
import AddNutritionForm from "./components/AddNutritionForm";

export default function Page() {
  const router = useRouter();
  const [showFoodList, setShowFoodList] = useState(false);
  const [foodList, setFoodList] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<null | Food>(null);
  const { handleSubmit, setValue, control } = useForm({
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
        <AddNutritionForm
          onSubmit={handleSubmit(addNutrition)}
          control={control}
          resetSelectedFood={resetSelectedFood}
          selectedFood={selectedFood}
          setShowFoodList={setShowFoodList}
        />
      ) : (
        <SavedFood
          foodList={foodList}
          setFood={setFoodFromList}
          setShowFoodList={setShowFoodList}
        />
      )}
    </section>
  );
}
