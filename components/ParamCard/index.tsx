import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

type PropTypes = {
  title: string;
  value: string;
};

const ParamsCard: React.FC<PropTypes> = ({
    title, value
}) => {
  return (
    <Card className="">
      <CardBody className="flex flex-col justify-center align-middle">
        <span className="text-center font-mono font-bold text-xl">{title}</span>
        <span className="text-center font-light text-lg">{value}</span>
      </CardBody>
    </Card>
  );
};

export default ParamsCard;
