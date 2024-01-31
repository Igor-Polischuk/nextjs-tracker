"useClient";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React, { useState } from "react";
import { clsx } from "clsx";

export type StepperPage = {
  element: React.JSX.Element;
};

type PropTypes = {
  pages: StepperPage[];
  title?: (currentPage: number) => string | string;
  onFinish: () => void;
};

export default function Stepper({ pages, onFinish, title }: PropTypes) {
  const totalPages = pages.length;
  const [currentPage, setCurrentPage] = useState(0);
  const isLastPage = currentPage + 1 === totalPages;

  const prevButtonStyles = clsx({
    hidden: currentPage === 0,
  });

  const nextButtonStyles = clsx({
    hidden: isLastPage,
  });
  const finishButtonStyles = clsx({
    hidden: !isLastPage,
  });

  const stepperTitle = title
    ? typeof title === "string"
      ? title
      : title(currentPage)
    : `Step ${currentPage + 1}/${totalPages}`;

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <h1>{stepperTitle}</h1>
      </CardHeader>
      <CardBody>{pages[currentPage].element}</CardBody>
      <CardFooter className="flex justify-stretch gap-5">
        <Button
          onClick={() => setCurrentPage((page) => --page)}
          className={`${prevButtonStyles}`}
          fullWidth
          color="primary"
          variant="flat"
        >
          Prev
        </Button>
        <Button
          onClick={() => setCurrentPage((page) => ++page)}
          className={`${nextButtonStyles}`}
          fullWidth
          color="primary"
        >
          Next
        </Button>
        <Button
          onClick={onFinish}
          className={`${finishButtonStyles}`}
          fullWidth
          variant="shadow"
          color="primary"
        >
          Finish
        </Button>
      </CardFooter>
    </Card>
  );
}
