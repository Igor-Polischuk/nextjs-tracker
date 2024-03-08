import React, { createContext, useReducer } from "react";
import { Workout, WorkoutContext } from "./workout-context.types";
import { initValue, workoutReducer } from "./workout-reducer";

export const workoutContext = createContext<WorkoutContext | null>(null);

export const WorkoutProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(workoutReducer, initValue);
  return (
    <workoutContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </workoutContext.Provider>
  );
};
