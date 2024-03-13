import { Exercises } from "@prisma/client";
import React from "react";

type PropTypes = {
  exercise: {
    name: string;
    secondaryMuscles: string[];
    primaryMuscles: string[];
  };
};

export default function ExerciseName({ exercise }: PropTypes) {
  return (
    <div className="flex justify-between items-center mb-5">
      <div>
        <p className="text-lg font-semibold text-default-500">
          {exercise.name}
        </p>
        <p className="flex gap-4 text-success-300 font-semibold">
          Focus on:
          {exercise.primaryMuscles.map((muscle) => (
            <span key={muscle}>{muscle}</span>
          ))}
        </p>
        <p className="flex gap-4 text-primary-300 font-semibold flex-wrap">
          {!!exercise.secondaryMuscles.length && (
            <>
              Secondary muscle groups:
              {exercise.secondaryMuscles.map((muscle) => (
                <span key={muscle}>{muscle}</span>
              ))}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
