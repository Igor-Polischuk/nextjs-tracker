/* eslint-disable react/no-unescaped-entities */
import { getPFC, getUserCaloriesNorm } from "@/lib/body-params";
import { getCurrentUser } from "@/lib/db/user";
import React from "react";

export default async function DayCaloriesCounter() {
  const user = await getCurrentUser();
  const calories = getUserCaloriesNorm(user);
  const {carbohydrates, fats, proteins} = getPFC(user.weight);

  return (
    <div>
      <p className="text-2xl font-medium">
        Today you've eaten: {"  "}
        <br className="xs:hidden" />
        <span className="text-4xl font-extralight	">0</span> /
        <span>{calories}</span>
      </p>
      <div className="flex xs:gap-5 font-light opacity-75 text-sm flex-col xs:flex-row">
        <p className="text-cyan-600">Proteins: 0 / {proteins}</p>
        <p className="text-amber-300">Fats: 0 / {fats}</p>
        <p className="text-emerald-600">Carbohydrates: 0 / {carbohydrates}</p>
      </div>
    </div>
  );
}
