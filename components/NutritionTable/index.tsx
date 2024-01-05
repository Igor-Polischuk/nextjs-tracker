import React from "react";
import MealItem from "./MealItem";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

const mockData = [
  {
    name: "Item1",
    proteins: 10.0,
    fats: 20.0,
    carbohydrates: 30.0,
    energy: 40.0,
    time: "12:00",
    amount: 100.0,
  },
  {
    name: "Item2",
    proteins: 11.0,
    fats: 21.0,
    carbohydrates: 31.0,
    energy: 41.0,
    time: "13:00",
    amount: 101.0,
  },
  {
    name: "Item3",
    proteins: 12.0,
    fats: 22.0,
    carbohydrates: 32.0,
    energy: 42.0,
    time: "14:00",
    amount: 102.0,
  },
  {
    name: "Item4",
    proteins: 13.0,
    fats: 23.0,
    carbohydrates: 33.0,
    energy: 43.0,
    time: "15:00",
    amount: 103.0,
  },
  {
    name: "Item5",
    proteins: 14.0,
    fats: 24.0,
    carbohydrates: 34.0,
    energy: 44.0,
    time: "16:00",
    amount: 104.0,
  },
  {
    name: "Item6",
    proteins: 15.0,
    fats: 25.0,
    carbohydrates: 35.0,
    energy: 45.0,
    time: "17:00",
    amount: 105.0,
  },
  {
    name: "Item7",
    proteins: 16.0,
    fats: 26.0,
    carbohydrates: 36.0,
    energy: 46.0,
    time: "18:00",
    amount: 106.0,
  },
  {
    name: "Item8",
    proteins: 17.0,
    fats: 27.0,
    carbohydrates: 37.0,
    energy: 47.0,
    time: "19:00",
    amount: 107.0,
  },
  {
    name: "Item9",
    proteins: 18.0,
    fats: 28.0,
    carbohydrates: 38.0,
    energy: 48.0,
    time: "20:00",
    amount: 108.0,
  },
  {
    name: "Item10",
    proteins: 19.0,
    fats: 29.0,
    carbohydrates: 39.0,
    energy: 49.0,
    time: "21:00",
    amount: 109.0,
  },
];

export default function NutritionTable() {
  return (
    <div className="mt-10">
      <h2 className="text-3xl mb-6">You ate today:</h2>
      <ScrollShadow hideScrollBar className="h-[500px] w-full">
        {mockData.map((meal, i) => {
          return (
            <div className="mb-4" key={i}>
              <MealItem {...meal} />
            </div>
          );
        })}
      </ScrollShadow>
    </div>
  );
}
