import React from "react";
import { Exercise } from "./AddExercises";

type PropTypes = {
  exercises: Exercise[];
};

export default function Exercises({ exercises }: PropTypes) {
  return (
    <div className="flex flex-col gap-5">
      {exercises.map((exercise, i) => {
        return (
          <div key={i}>
            <div className="flex justify-between flex-wrap">
              <p className="font-bold">{exercise.name}</p>
              <p className="flex gap-5 max-w-full overflow-y-scroll">
                {exercise.sets.map((set, j) => {
                  return (
                    <span key={j}>
                      {set.reps}reps{set.weight ? `/${set.weight}kg` : ""}
                    </span>
                  );
                })}
              </p>
            </div>
            <p className="text-secondary-800 opacity-70 font-thin text-xs">{exercise.description}</p>
          </div>
        );
      })}
    </div>
  );
}
