import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Food } from "@prisma/client";
import React from "react";

type PropTypes = {
  foodList: Food[];
  setFood: (food: Food) => void;
};

export default function FoodList({ foodList, setFood }: PropTypes) {
  return (
    <ScrollShadow className="h-[65vh] w-full mt-5 mb-5">
      {foodList.map((food) => {
        return (
          <div key={food.id} onClick={() => setFood(food)}>
            <Card className="hover:opacity-50 cursor-pointer hover:drop-shadow-xl">
              <CardHeader className="flex justify-between flex-row pb-0">
                <span className="text-lg space-x-4 tracking-wide">
                  {food.foodName}
                </span>
                <span>{food.calories} kkal</span>
              </CardHeader>
              <CardBody className="flex justify-between flex-row pt-0">
                <span className="flex gap-4 text-xs opacity-60 font-light">
                  <span className="text-cyan-600">P: {food.proteins}</span>
                  <span className="text-amber-300">F: {food.fats}</span>
                  <span className="text-emerald-600">
                    C: {food.carbohydrates}
                  </span>
                </span>
              </CardBody>
            </Card>
          </div>
        );
      })}
    </ScrollShadow>
  );
}
