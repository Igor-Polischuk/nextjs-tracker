import { Button } from "@nextui-org/button";
import React from "react";
import DayCaloriesCounter from "../DayCaloriesCounter";
import Link from "next/link";

export default function TodayNutritionStats() {
  return (
    <div className="flex flex-col  justify-between items-center sm:flex-row">
      <div className="self-start">
        <DayCaloriesCounter />
      </div>
      <Button
        className="w-full mt-5 sm:mt-0 sm:w-auto p-0"
        variant="shadow"
        color="primary"
      >
        <Link className="block w-full h-full flex justify-center items-center p-4" href="/diet/add-meal">Add a meal</Link>
      </Button>
    </div>
  );
}
