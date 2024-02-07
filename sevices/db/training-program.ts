import { DayTraining } from "@/app/(dashboard)/fitness/create-program/components/AddTrainingDay";
import { prisma } from ".";
import { $Enums, User } from "@prisma/client";

export type ProgramData = {
  name: string;
  description: string;
  programExercises: DayTraining[];
};

export async function createTrainingProgram(
  programData: ProgramData,
  user: User
) {
  return await prisma.trainingProgram.create({
    data: {
      title: programData.name,
      description: programData.description,
      userId: user.id,
      ProgramExercise: {
        create: programData.programExercises.flatMap((dayTraining) =>
          dayTraining.exercises.map((exercise) => ({
            name: exercise.name,
            description: exercise.description,
            day: dayTraining.dayName,
            type: $Enums.TrainingActivityType.EXERCISE,
            sets: {
              create: exercise.sets.map((set) => ({
                reps: set.reps,
                weight: set.weight || null,
              })),
            },
          }))
        ),
      },
    },
  });
}
