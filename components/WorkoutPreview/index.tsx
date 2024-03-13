import { getUserWorkouts } from "@/services/db/workout";
import { ArrayElement } from "@/types";
import { getTimeBetweenDates } from "@/utils/get-time-between-dates";
import React from "react";
import ButtonLink from "../ButtonLink";

type PropTypes = {
  workout: ArrayElement<Awaited<ReturnType<typeof getUserWorkouts>>>;
};

export default function WorkoutPreview({ workout }: PropTypes) {
  return (
    <div className="flex flex-col justify-center items-center mb-4">
      <div className="bg-default-100 w-full p-5 rounded-lg">
        <div className="flex justify-between text-lg font-extrabold border-b-2 mb-3">
          <span>{workout.startTime.toLocaleDateString()}</span>
          <span>{getTimeBetweenDates(workout.startTime, workout.endTime)}</span>
        </div>
        <div className="flex flex-col gap-4 border-b-2 mb-3 pb-3">
          {workout.exercises.map((exercise) => {
            return (
              <div key={exercise.id} className="flex justify-between flex-wrap">
                <p className="font-bold">{exercise.exercise.name}</p>
                <p className="flex gap-5 max-w-full overflow-y-scroll">
                  {exercise.sets.map((set) => {
                    return (
                      <span key={set.id}>
                        {set.reps}x{set.weight}kg
                      </span>
                    );
                  })}
                </p>
              </div>
            );
          })}
        </div>
        <div className="min-w-full flex justify-stretch">
          <ButtonLink href={`fitness/workout/${workout.id}`}>See details</ButtonLink>
        </div>
      </div>
    </div>
  );
}
