"use client";

import { ActionType, useWorkoutContext } from "@/contexts/workout-context";
import { Button } from "@nextui-org/button";
import React, { useEffect } from "react";

export default function Page() {
  const [state, dispatch] = useWorkoutContext();

  console.log(state);

  return (
    <div>
      <h1 className="text-4xl font-bold">Workout</h1>
      <p></p>
      <Button
        onClick={() => {
          dispatch({
            type: ActionType.START_EXERCISE,
            payload: {
              exerciseId: '1232',
            },
          });
        }}
      >
        Add
      </Button>
    </div>
  );
}
