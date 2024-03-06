import { uppercaseFirstLetter } from "@/utils/uppercase-first-letter";
import { Food } from "@prisma/client";
import React from "react";

type FoodCardProps = {} & Pick<
  Food,
  "calories" | "carbohydrates" | "foodName" | "fats" | "proteins"
>;

export default function FoodCard({ foodName, calories }: FoodCardProps) {
  return (
    <div className="flex rounded-xl justify-between items-center bg-default-50 px-5 py-3 hover:bg-default-100 transition">
      <h4>{uppercaseFirstLetter(foodName)}</h4>
      <p>
        <span>{calories}</span>
        <span>kcal</span>
      </p>
    </div>
  );
}
