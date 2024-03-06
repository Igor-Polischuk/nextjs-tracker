import { getFoodList } from "@/services/db/nutrition";
import React from "react";
import Search from "./components/Search";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { getCurrentUser } from "@/services/db/user";
import AddFoodToNutrition from "./components/AddFoodToNutrition";

export default async function Page() {
  const currentUser = await getCurrentUser();
  const foodList = await getFoodList(currentUser.id);
  return (
    <main>
      <div>
        <Search />
        <Button fullWidth className="my-3 p-0">
          <Link
            className="flex w-full h-full justify-center items-center"
            href={"/diet/create-meal"}
          >
            Create meal
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {foodList.map((food) => {
          return <AddFoodToNutrition {...food} key={food.id} />;
        })}
      </div>
    </main>
  );
}
