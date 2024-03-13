import { Workout, WorkoutExercise } from "@/contexts/workout-context";
import { User } from "@prisma/client";
import { prisma } from ".";

export type CreateWorkoutType = {
  exercises: WorkoutExercise[];
  startTime: Date;
  endTime: Date;
};

export const createWorkout = (
  { endTime, exercises, startTime }: CreateWorkoutType,
  user: User
) => {
  return prisma.workout.create({
    data: {
      startTime,
      endTime,
      userId: user.id,
      exercises: {
        create: exercises.map(({ exerciseId, sets }) => ({
          exerciseId: exerciseId,
          sets: {
            create: sets.map(({ reps, type, weights }) => ({
              reps,
              weight: weights,
              type,
            })),
          },
        })),
      },
    },
  });
};

export const getUserWorkouts = (userId: number) => {
  return prisma.workout.findMany({
    where: {
      userId,
    },
    include: {
      exercises: {
        include: {
          sets: true,
          exercise: true
        }
      }
    }
  });
};
