import ServerTable from "@/components/Table";
import {
  getTrainingProgramById,
  groupProgramExerciseByDays,
} from "@/services/db/training-program";
import { ProgramExercise, ProgramExercisesSet } from "@prisma/client";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const program = await getTrainingProgramById(params.id);

  if (!program) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-4xl font-medium">Program does not exist</p>
      </div>
    );
  }

  const getTableData = (
    exercisePerDay: (ProgramExercise & { sets: ProgramExercisesSet[] })[]
  ) => {
    const tableData = exercisePerDay.map((exercise) => {
      const name = exercise.name;
      const sets = exercise.sets.length;
      const repsArr = exercise.sets.map((set) => set.reps);
      const minReps = Math.min(...repsArr);
      const maxReps = Math.max(...repsArr);

      const repsStr =
        maxReps === minReps ? `${minReps}` : `${minReps} - ${maxReps}`;

      return {
        name,
        sets,
        reps: repsStr,
      };
    });
    return tableData;
  };

  const groupedByDays = groupProgramExerciseByDays(program.ProgramExercise);
  const days = Object.keys(groupedByDays);

  return (
    <section>
      <h1 className="text-5xl font-semibold mb-5">{program?.title}</h1>
      <p className="mb-5">{program.description}</p>
      <hr className="mb-10" />
      {days.map((dayTrainingName) => {
        return (
          <div key={dayTrainingName} className="mb-20">
            <h3 className="text-4xl font-semibold mb-7">{dayTrainingName}</h3>
            <ServerTable data={getTableData(groupedByDays[dayTrainingName])} />
            {groupedByDays[dayTrainingName].map((exercise) => {
              return exercise.description ? (
                <div key={exercise.id} className="flex flex-wrap gap-3 p-3 items-end">
                  <p className="text-lg font-semibold">{exercise.name}*</p>
                  <p className="font-thin">{exercise.description}</p>
                </div>
              ) : null;
            })}
          </div>
        );
      })}
    </section>
  );
}
