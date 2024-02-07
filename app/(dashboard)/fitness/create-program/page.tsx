"use client";

import { Input, Textarea } from "@nextui-org/input";
import React, { useState } from "react";
import AddTrainingDay, { DayTraining } from "./components/AddTrainingDay";
import TrainingDays from "./components/TrainingDays";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [programName, setProgramName] = useState("");
  const [programDesc, setProgramDesc] = useState("");
  const [programTrainingByDays, setProgramTrainingByDays] = useState<
    DayTraining[]
  >([]);

  const onSetTrainingDay = (dayTrainingData: DayTraining) => {
    const nameAlreadyTakenIndex = programTrainingByDays.findIndex(
      (tr) => tr.dayName === dayTrainingData.dayName
    );

    if (nameAlreadyTakenIndex === -1) {
      setProgramTrainingByDays((prev) => [...prev, dayTrainingData]);
      return;
    }

    const duplicatesCount = programTrainingByDays
      .filter((tr) => tr.dayName.startsWith(dayTrainingData.dayName))
      .flatMap((filteredTraining) => {
        const lastPart = filteredTraining.dayName.split(" ").slice(-1);
        const isNumber = Number.isInteger(Number(lastPart));

        return isNumber ? 1 : [];
      }).length;

    setProgramTrainingByDays((prev) => [
      ...prev,
      {
        exercises: dayTrainingData.exercises,
        dayName: `${dayTrainingData.dayName} ${duplicatesCount + 1}`,
      },
    ]);
  };

  const onTrainingSave = async () => {
    const trainProgram = {
      name: programName,
      description: programDesc,
      programExercises: programTrainingByDays,
    };

    await fetch(`/api/training-program`, {
      method: "POST",
      body: JSON.stringify(trainProgram),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/fitness");
    // router.refresh();
  };

  return (
    <div>
      <h1 className="text-3xl mb-6">Create program</h1>
      <div>
        <Input
          label="title"
          className="mb-4"
          onChange={(e) => setProgramName(e.target.value)}
          value={programName}
        />
        <Textarea
          placeholder="description"
          className="mb-4"
          onChange={(e) => setProgramDesc(e.target.value)}
          value={programDesc}
        />
        <hr className="mb-4" />
        <TrainingDays programTrainingByDays={programTrainingByDays} />
        <AddTrainingDay onSetTrainingDay={onSetTrainingDay} />
        <hr className="mt-4 mb-4" />
        <div className="flex justify-stretch gap-6">
          <Button fullWidth variant="flat" color="danger" onClick={router.back}>
            Cancel
          </Button>
          <Button fullWidth color="success" onClick={onTrainingSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
