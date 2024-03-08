import {
  ExerciseFilters,
  getExercisesWithFilterParams,
  getPublicExercises,
} from "@/services/db/exercises";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ExercisesFilter from "./components/ExercisesFilter";

type PageParams = {
  searchParams: Record<string, string>;
};

export default async function Page(params: PageParams) {
  const filters = Object.keys(params.searchParams).reduce<ExerciseFilters>(
    (filters, filterName) => {
      return {
        ...filters,
        [filterName]: params.searchParams[filterName].split(", "),
      };
    },
    {}
  );

  const { allExercises, filterParams } = await getExercisesWithFilterParams();
  const filteredExercises = await getPublicExercises(filters);

  return (
    <div>
      <h1 className="text-3xl mb-6 ">Exercises</h1>
      <ExercisesFilter exercises={allExercises} filterParams={filterParams} />
      {filteredExercises.map((exercise) => {
        return (
          <Link key={exercise.id} href={`/fitness/exercises/${exercise.id}`}>
            <div className="flex items-center bg-default-100 rounded-lg p-5 gap-5 mb-6">
              <div className="min-w-[100px] flex justify-center items-center">
                <Image
                  width={100}
                  height={100}
                  src={exercise.images[0]}
                  alt="cw"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-default-500">
                  {exercise.name}
                </p>
                <p className="flex gap-4 text-success-300 font-semibold">
                  Focus on:
                  {exercise.primaryMuscles.map((muscle) => (
                    <span key={muscle}>{muscle}</span>
                  ))}
                </p>
                <p className="flex gap-4 text-primary-300 font-semibold flex-wrap">
                  {!!exercise.secondaryMuscles.length && (
                    <>
                      Secondary muscle groups:
                      {exercise.secondaryMuscles.map((muscle) => (
                        <span key={muscle}>{muscle}</span>
                      ))}
                    </>
                  )}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
