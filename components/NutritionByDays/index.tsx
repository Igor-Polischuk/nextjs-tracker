import React from "react";
import {
  calculateNutritionTotal,
  getNutritionByDays,
} from "@/sevices/db/nutrition";

type PropTypes = {
  nutritionByDate: Awaited<ReturnType<typeof getNutritionByDays>>;
};

export default function NutritionByDays({ nutritionByDate }: PropTypes) {
  const days = Object.keys(nutritionByDate).reverse().slice(1, 7);
  const daysAmount = days.length >= 7 ? 7 : days.length;
  const sEnding = daysAmount === 1 ? "'s" : "";
  return (
    !!days.length && (
      <div>
        <h2 className="text-3xl mb-6">
          Last {daysAmount} day{sEnding}
        </h2>
        <div className="flex gap-5 max-w-full overflow-y-scroll">
          {days.map((day, i) => {
            const date = new Date(day).toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            });
            const nutritionAmountPerDay = calculateNutritionTotal(
              nutritionByDate[day]
            );
            return (
              <div
                key={i}
                className="bg-default-100 min-w-[195px] max-w-[195px] rounded-md p-2 font-thin"
              >
                <p className="font-semibold text-lg">{date}</p>
                <p>
                  Total energy:{" "}
                  <span className="font-medium">
                    {nutritionAmountPerDay.energy}
                  </span>
                  kkal
                </p>
                <p>
                  Proteins:{" "}
                  <span className="font-medium">
                    {nutritionAmountPerDay.proteins}
                  </span>
                  g
                </p>
                <p>
                  Fats:{" "}
                  <span className="font-medium">
                    {nutritionAmountPerDay.fats}
                  </span>
                  g
                </p>
                <p>
                  Carbohydrates:{" "}
                  <span className="font-medium">
                    {nutritionAmountPerDay.carbohydrates}
                  </span>
                  g
                </p>
                <p>
                  Total amount:{" "}
                  <span className="font-medium">
                    {nutritionAmountPerDay.amount}
                  </span>
                  g
                </p>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
