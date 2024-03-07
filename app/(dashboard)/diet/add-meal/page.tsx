import { getFoodList } from "@/services/db/nutrition";
import React from "react";
import Search from "@/components/Search";
import { getCurrentUser } from "@/services/db/user";
import AddFoodToNutrition from "./components/AddFoodToNutrition";
import ButtonLink from "@/components/ButtonLink";

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const currentUser = await getCurrentUser();
  const foodList = await getFoodList(currentUser.id, searchParams.query);
  return (
    <main>
      <div>
        <Search />
        <ButtonLink href={"/diet/create-meal"} fullWidth>
          Create meal
        </ButtonLink>
      </div>
      <div className="flex flex-col gap-3">
        {foodList.map((food) => {
          return <AddFoodToNutrition {...food} key={food.id} />;
        })}
      </div>
    </main>
  );
}
