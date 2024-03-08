import React from "react";
import ButtonLink from "./ButtonLink";

export default function ExercisesWidget() {
  return (
    <div className="flex px-4 justify-between items-center bg-default-100 rounded-xl my-5">
      <p className="text-xl font-bold">Explore exercises</p>
      <ButtonLink href={"/fitness/exercises"} color="primary">
        Explore
      </ButtonLink>
    </div>
  );
}
