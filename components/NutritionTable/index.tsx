/* eslint-disable react/no-unescaped-entities */
import React from "react";
import MealItem from "./MealItem";
import { getDailyNutritionData } from "@/services/db/nutrition";

type PropTypes = {
  nutritionData: Awaited<ReturnType<typeof getDailyNutritionData>>;
};

export default function NutritionTable({ nutritionData }: PropTypes) {
  const todayMealsData = nutritionData.map((mealData) => {
    return {
      name: mealData.food.foodName,
      time: mealData.date.toDateString(),
      proteins: (mealData.food.proteins / 100) * mealData.amount,
      fats: (mealData.food.fats / 100) * mealData.amount,
      carbohydrates: (mealData.food.carbohydrates / 100) * mealData.amount,
      energy: (mealData.food.calories / 100) * mealData.amount,
      amount: mealData.amount,
    };
  });

  return (
    <div className="mt-10">
      <h2 className="text-3xl mb-6">You ate today:</h2>
      {nutritionData.length ? (
        <div className="w-full">
          {todayMealsData.map((meal, i) => {
            return (
              <div className="mb-4" key={i}>
                <MealItem {...meal} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg w-full flex justify-center items-center mb-5">
          <p>You haven't eaten today yet</p>
        </div>
      )}
    </div>
  );
}
