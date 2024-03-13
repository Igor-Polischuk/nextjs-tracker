"use client";

import ChooseExerciseModal from "@/components/ChooseExerciseModal";
import { ActionType, useWorkoutContext } from "@/contexts/workout-context";
import { getTimeString } from "@/utils/get-time";
import React, { useEffect } from "react";
import AddSetModal from "./components/AddSetModal";
import ServerTable from "@/components/Table";
import { Button } from "@nextui-org/button";
import ExerciseName from "@/components/ExerciseName";
import FinishWorkoutModal from "./components/FinishWorkoutModal";

export default function Page() {
  const [state, dispatch] = useWorkoutContext();

  useEffect(() => {
    dispatch({
      type: ActionType.START_WORKOUT,
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Workout</h1>
          <p className="text-default-500 mb-5">
            Started at: {getTimeString(state.workoutStartTime || new Date())}
          </p>
        </div>
        <FinishWorkoutModal workout={state} />
      </div>
      {!state.currentExercise && (
        <ChooseExerciseModal
          onExerciseSelect={(exercise) =>
            dispatch({
              type: ActionType.START_EXERCISE,
              payload: {
                exerciseId: exercise.id,
                exerciseName: exercise.name,
                primaryMuscles: exercise.primaryMuscles,
                secondaryMuscles: exercise.secondaryMuscles,
              },
            })
          }
        />
      )}
      {state.currentExercise && (
        <div>
          <h4 className="text-3xl mb-6 mt-10">Current exercise</h4>
          <ExerciseName exercise={state.currentExercise} />
          {!!state.currentExercise.sets.length && (
            <ServerTable data={state.currentExercise.sets} />
          )}
          <div className="grid grid-cols-[2fr_1fr] gap-3 mt-5">
            <AddSetModal
              buttonProps={{
                fullWidth: true,
              }}
              onAddSet={(payload) => {
                dispatch({
                  type: ActionType.ADD_SET,
                  payload,
                });
              }}
            />
            <Button
              fullWidth
              onClick={() => {
                dispatch({
                  type: ActionType.FINISH_EXERCISE,
                });
              }}
            >
              Finish exercise
            </Button>
          </div>
        </div>
      )}
      <div>
        <h4 className="text-3xl mb-6 mt-10">Previous exercises</h4>
        {state.prevExercises.map((exercise) => {
          return (
            <div
              key={exercise.exerciseId + exercise.sets.length}
              className="mb-5"
            >
              <ExerciseName exercise={exercise} />
              <ServerTable data={exercise.sets} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
