import ExerciseName from "@/components/ExerciseName";
import ServerTable from "@/components/Table";
import { getWorkoutById } from "@/services/db/workout";
import React from "react";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default async function Page({ params }: { params: { id: string } }) {
  const workout = await getWorkoutById(params.id);

  return (
    <div>
      <h1 className="text-3xl mb-6 mt-10">
        Workout for {workout?.startTime.toLocaleDateString("en-Us", options)}
      </h1>
      {workout.exercises.map((exercise) => {
        return (
          <div
            key={exercise.exerciseId + exercise.sets.length}
            className="mb-5"
          >
            <ExerciseName exercise={exercise.exercise} />

            <p>Total sets: {exercise.sets.length}</p>
            <p>Total reps: {exercise.sets.reduce((sum, curr) => sum + curr.reps, 0)}</p>
            <p>Processed weight: {exercise.sets.reduce((sum, curr) => sum + curr.weight, 0)}</p>

            <ServerTable
              data={exercise.sets.map((set) => ({
                weight: set.weight,
                reps: set.weight,
                type: set.type,
              }))}
            />
          </div>
        );
      })}
    </div>
  );
}
