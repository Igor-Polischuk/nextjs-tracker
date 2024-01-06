import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

type PropTypes = {
  name: string;
  proteins: number | null;
  fats: number | null;
  carbohydrates: number | null;
  energy: number;
  time: string;
  amount: number;
};

const MealItem: React.FC<PropTypes> = ({
  carbohydrates,
  energy,
  fats,
  name,
  proteins,
  time,
  amount,
}) => {
  return (
    <Card>
      <CardHeader className="flex  items-end gap-5">
        <p className="text-sm font-extralight opacity-50">{time}</p>
        <p className="text-xl">{name}</p>
        <p className="ml-auto font-semibold">{amount} g</p>
      </CardHeader>
      <Divider />
      <CardBody className="flex justify-between flex-row">
        <div className="flex justify-between">
          <p className="flex gap-10 justify-between font-light">
            <span>{energy}kkal</span>
            <span className="text-cyan-600">{proteins}</span>
            <span className="text-amber-300">{fats}</span>
            <span className="text-emerald-600">{carbohydrates}</span>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default MealItem;
