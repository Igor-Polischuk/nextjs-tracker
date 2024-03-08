import { prisma } from ".";

export type ExercisesFiltersValues = {
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string[];
  force: string[];
};

export type ExerciseFilters = {
  query?: string[];
} & Partial<ExercisesFiltersValues>;

export async function getPublicExercises(filters: ExerciseFilters) {
  const generateWhere = (filters: Partial<ExerciseFilters>) =>
    Object.entries(filters).reduce((acc, [key, value]) => {
      if (!value) return acc;

      switch (key) {
        case "query":
          return { ...acc, name: { contains: value[0], mode: "insensitive" } };

        case "equipment":
        case "force":
          return { ...acc, [key]: { contains: value[0] } };
        case "primaryMuscles":
        case "secondaryMuscles":
          if (Array.isArray(value) && value.length > 0) {
            return { ...acc, [key]: { hasEvery: value } };
          }
          return acc;
        default:
          return acc;
      }
    }, {});

  const where = generateWhere(filters);
  return prisma.exercises.findMany({
    orderBy: {
      name: "asc",
    },
    where,
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
    allExercises: exercises,
  };
}

export function getExerciseById(id: string) {
  return prisma.exercises.findFirst({
    where: {
      id,
    },
  });
}
