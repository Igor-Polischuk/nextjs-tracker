import { prisma } from ".";

export type ExercisesFiltersValues = {
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string[];
  force: string[];
};

export async function getPublicExercises() {
  return prisma.exercises.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getExercisesWithFilterParams() {
  const exercises = await prisma.exercises.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const filterParams = exercises.reduce<ExercisesFiltersValues>(
    (acc, exercise) => {
      const { primaryMuscles, secondaryMuscles, equipment, force } = exercise;

      const newPrimaryMuscles = Array.from(
        new Set([...acc.primaryMuscles, ...primaryMuscles])
      );
      const newSecondaryMuscles = Array.from(
        new Set([...acc.secondaryMuscles, ...secondaryMuscles])
      );
      const newEquipment = acc.equipment.includes(equipment)
        ? acc.equipment
        : [...acc.equipment, equipment];
      const newForce = acc.force.includes(force)
        ? acc.force
        : [...acc.force, force];

      return {
        primaryMuscles: newPrimaryMuscles,
        secondaryMuscles: newSecondaryMuscles,
        equipment: newEquipment,
        force: newForce,
      };
    },
    {
      primaryMuscles: [],
      secondaryMuscles: [],
      equipment: [],
      force: [],
    }
  );

  return {
    filterParams,
    exercises,
  };
}

export function getExerciseById(id: string) {
  return prisma.exercises.findFirst({
    where: {
      id,
    },
  });
}
