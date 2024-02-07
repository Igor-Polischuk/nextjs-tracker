import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";

type PropTypes = {
    sets: Set[]
    setSet:  React.Dispatch<React.SetStateAction<Set[]>>
}

export type Set = {
  reps: number;
  weight?: number;
};

export default function AddSet({setSet, sets}: PropTypes) {
  const [isAddNewSet, setIsAddNewSet] = useState(false);
  const [currentReps, setCurrentReps] = useState<number>();
  const [currentWeight, setCurrentWeight] = useState<number>();
  const [repeat, setRepeat] = useState<number>();

  const addSet = () => {
    const newSets: Set[] = new Array(repeat || 1).fill({
      reps: currentReps,
      weight: currentWeight,
    });
    setSet((prevSets) => [...prevSets, ...newSets]);
    setIsAddNewSet(false);
    setCurrentReps(undefined);
    setCurrentWeight(undefined);
    setRepeat(undefined);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {sets.map((set, i) => {
          return (
            <div key={i} className="flex gap-4 items-center">
              <Input size="sm" label="Reps" disabled value={`${set.reps}`} />
              <Input
                size="sm"
                label="Weight"
                disabled
                value={`${set.weight || "-"}`}
              />
            </div>
          );
        })}
      </div>
      {isAddNewSet ? (
        <div className="flex gap-4 items-center">
          <Input
            size="sm"
            label="Reps"
            onChange={(e) => setCurrentReps(Number(e.currentTarget.value))}
            value={`${currentReps || ""}`}
          />
          <Input
            size="sm"
            label="Weight"
            onChange={(e) => setCurrentWeight(Number(e.currentTarget.value))}
            value={`${currentWeight || ""}`}
          />
          <Input
            size="sm"
            label="Repeat"
            onChange={(e) => setRepeat(Number(e.currentTarget.value))}
            value={`${repeat || ""}`}
          />
          <Button color="secondary" disabled={!currentReps} onClick={addSet}>
            Add
          </Button>
        </div>
      ) : (
        <Button onClick={() => setIsAddNewSet(true)}>Add set</Button>
      )}
    </>
  );
}
