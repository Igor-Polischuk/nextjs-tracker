import { DayTraining } from "@/app/(dashboard)/fitness/create-program/components/AddTrainingDay";
import { prisma } from ".";
import { ProgramExercise, ProgramExercisesSet, User } from "@prisma/client";

export type ProgramData = {
  name: string;
  description: string;
  programExercises: DayTraining[];
};

export async function createTrainingProgram(
  programData: ProgramData,
  user: User
) {
  return prisma.trainingProgram.create({
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

export async function getUserTrainingPrograms(userId: number) {
  const programs = await prisma.trainingProgram.findMany({
    where: {
      userId,
    },
    include: {
      ProgramExercise: {
        include: {
          sets: true,
        },
      },
    },
  });

  return programs;
}

export async function getTrainingProgramById(id: string) {
  const programs = await prisma.trainingProgram.findFirst({
    where: {
      id,
    },
    include: {
      ProgramExercise: {
        include: {
          sets: true,
        },
      },
    },
  });

  return programs;
}

type GroupedByDaysExerciseReduce = Record<string, (ProgramExercise & {sets: ProgramExercisesSet[]})[]>;

export function groupProgramExerciseByDays(
  programExercises: (ProgramExercise & {sets: ProgramExercisesSet[]})[]
) {
  const groupedByDays = programExercises.reduce<GroupedByDaysExerciseReduce>(
    (grouped, current) => {
      grouped[current.day] = [...(grouped[current.day] || []), current];

      return grouped;
    },
    {}
  );

  return groupedByDays;
}
