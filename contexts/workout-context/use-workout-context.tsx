import { Dispatch, useContext } from "react";
import { workoutContext } from "./workout-context";
import { ActionType, Workout, WorkoutAction } from "./workout-context.types";

export const useWorkoutContext = (): [Workout, Dispatch<WorkoutAction>] => {
  const ctx = useContext(workoutContext);

  if (!ctx) {
    throw Error("Workout context error");
  }

  return [ctx.state, ctx.dispatch];
};
