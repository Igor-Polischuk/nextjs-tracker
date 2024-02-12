import { prisma } from ".";

export async function getPublicExercises() {
  return prisma.exercises.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export function getExerciseById(id: string) {
  return prisma.exercises.findFirst({
    where: {
      id,
    },
  });
}
