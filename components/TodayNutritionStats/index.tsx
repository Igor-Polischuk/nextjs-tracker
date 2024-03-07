import { Button } from "@nextui-org/button";
import React from "react";
import DayCaloriesCounter from "../DayCaloriesCounter";
import Link from "next/link";
import { getDailyNutritionData } from "@/services/db/nutrition";
import { User } from "@prisma/client";
import ButtonLink from "../ButtonLink";

type PropTypes = {
  user: User;
  nutritionData: Awaited<ReturnType<typeof getDailyNutritionData>>;
};

export default function TodayNutritionStats({
  nutritionData,
  user,
}: PropTypes) {
  return (
    <div className="flex flex-col  justify-between items-center sm:flex-row">
      <div className="self-start">
        <DayCaloriesCounter nutritionData={nutritionData} user={user} />
      </div>
      <ButtonLink
        href={"/diet/add-meal"}
        variant="shadow"
        color="primary"
      >
        Add a meal
      </ButtonLink>
    </div>
  );
}
