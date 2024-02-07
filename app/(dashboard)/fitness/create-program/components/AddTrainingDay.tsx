"use client";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import AddExercises, { Exercise } from "./AddExercises";
import Exercises from "./Exercises";

export type DayTraining = {
  dayName: string;
  exercises: Exercise[];
};

type PropTypes = {
  onSetTrainingDay: (dayTrainingData: DayTraining) => void;
};

export default function AddTrainingDay({ onSetTrainingDay }: PropTypes) {
  const [editMode, setEditMode] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [dayName, setDayName] = useState("");

  const wrapperBaseClasses =
    "flex w-full min-h-[200px] border-dashed border-1 rounded-md p-5";
  const wrapperNoEditModeClasses =
    "justify-center items-center cursor-pointer hover:bg-default-50 transition-background ";
  const editModeClasses = "flex-col";
  const wrapperClasses = `${wrapperBaseClasses} ${
    editMode ? editModeClasses : wrapperNoEditModeClasses
  }`;

  const addExercise = (exercise: Exercise) => {
    setExercises((prev) => [...prev, exercise]);
  };

  const reset = () => {
    setDayName("");
    setExercises([]);
  };

  const onSave = () => {
    onSetTrainingDay({
      dayName,
      exercises,
    });
    reset();
    setEditMode(false);
  };

  const saveDisabled = !exercises.length || !dayName;

  return (
    <div onClick={() => setEditMode(true)} className={wrapperClasses}>
      {!editMode && <span className="text-9xl text-primary-50">+</span>}
      {editMode && (
        <div className="flex flex-col gap-5">
          <Input
            label="Day name"
            size="sm"
            onChange={(e) => setDayName(e.target.value)}
            value={dayName}
          />
          <Exercises exercises={exercises} />
          <AddExercises onSetExercise={addExercise} />
          <div className="flex justify-stretch w-full gap-5">
            <Button
              onClick={() => {
                setEditMode(false);
                reset();
              }}
              fullWidth
              color="danger"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button fullWidth color="success" variant="solid" onClick={onSave} disabled={saveDisabled}>
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
