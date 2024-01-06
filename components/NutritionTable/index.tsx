import React from "react";
import MealItem from "./MealItem";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { getDailyNutritionData } from "@/lib/db/nutrition";
import { getCurrentUser } from "@/lib/db/user";

export default async function NutritionTable() {
  const user = await getCurrentUser()
  const nutritionData = await getDailyNutritionData(new Date(), user.id)

  const todayMealsData = nutritionData.map(mealData => {
    return {
      name: mealData.food.foodName,
      time: mealData.date.toDateString(),
      proteins: mealData.food.proteins / 100 * mealData.amount,
      fats: mealData.food.fats / 100 * mealData.amount,
      carbohydrates: mealData.food.carbohydrates / 100 * mealData.amount,
      energy: mealData.food.calories / 100 * mealData.amount,
      amount: mealData.amount,
    }
  })

  return (
    <div className="mt-10">
      <h2 className="text-3xl mb-6">You ate today:</h2>
      {nutritionData.length ? <ScrollShadow hideScrollBar className="h-[500px] w-full">
        {todayMealsData.map((meal, i) => {
          return (
            <div className="mb-4" key={i}>
              <MealItem {...meal}/>
            </div>
          );
        })}
      </ScrollShadow> : <div className="rounded-lg h-[300px] w-full flex justify-center items-center border-solid border-1 border-stone-600 mb-3">
          <p>No any data yet</p>
        </div>}
    </div>
  );
}
