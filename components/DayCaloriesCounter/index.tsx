/* eslint-disable react/no-unescaped-entities */
import { getPFC, getUserCaloriesNorm } from "@/lib/body-params";
import { getDailyNutritionData } from "@/lib/db/nutrition";
import { getCurrentUser } from "@/lib/db/user";
import { calculateNutrition } from "@/lib/nutrition";
import React from "react";

export default async function DayCaloriesCounter() {
  const user = await getCurrentUser();
  const nutritionData = await getDailyNutritionData(new Date(), user.id)
  const calories = getUserCaloriesNorm(user);
  const {carbohydrates, fats, proteins} = getPFC(user.weight);
  const eatenData = calculateNutrition(nutritionData)

  return (
    <div>
      <p className="text-2xl font-medium">
        Today you've eaten: {"  "}
        <br className="xs:hidden" />
        <span className="text-4xl font-extralight	">{eatenData.energy}</span> /
        <span>{calories}</span>
      </p>
      <div className="flex xs:gap-5 font-light opacity-75 text-sm flex-col xs:flex-row">
        <p className="text-cyan-600">Proteins: {eatenData.proteins} / {proteins}</p>
        <p className="text-amber-300">Fats: {eatenData.fats} / {fats}</p>
        <p className="text-emerald-600">Carbohydrates: {eatenData.carbohydrates} / {carbohydrates}</p>
      </div>
    </div>
  );
}
