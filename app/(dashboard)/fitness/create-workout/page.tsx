"use client";

import { ActionType, useWorkoutContext } from "@/contexts/workout-context";
import { Button } from "@nextui-org/button";
import React, { useEffect } from "react";

export default function Page() {
  const [state, dispatch] = useWorkoutContext();

  useEffect(() => {
    dispatch({
      type: ActionType.START_WORKOUT,
    });
  }, []);

  console.log(state);
  console.log(
    state.workoutStartTime?.getHours(),
    ":",
    state.workoutStartTime?.getMinutes()
  );

  return (
    <div>
      <h1 className="text-4xl font-bold">Workout</h1>
      <p></p>
    </div>
  );
}
