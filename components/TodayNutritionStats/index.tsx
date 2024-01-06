import { Button } from "@nextui-org/button";
import React from "react";
import DayCaloriesCounter from "../DayCaloriesCounter";

export default function TodayNutritionStats() {
  return (
    <div className="flex flex-col  justify-between items-center sm:flex-row">
      <div className="self-start">
        <DayCaloriesCounter />
      </div>
      <Button
        className="w-full mt-5 sm:mt-0 sm:w-auto"
        variant="shadow"
        color="primary"
      >
        Add a meal
      </Button>
    </div>
  );
}
