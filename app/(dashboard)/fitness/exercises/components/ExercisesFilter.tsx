"use client";

import Filter, { FilterElement } from "@/components/Filter";
import Search from "@/components/Search";
import { ExercisesFiltersValues } from "@/services/db/exercises";
import { Exercises } from "@prisma/client";
import React from "react";

type PropTypes = {
  exercises: Exercises[];
  filterParams: ExercisesFiltersValues;
};

export default function ExercisesFilter({
  exercises,
  filterParams,
}: PropTypes) {
  const filters: FilterElement[] = [
    {
      name: "Primary muscles",
      values: filterParams.primaryMuscles,
      mode: "multiple",
      key: "primaryMuscles",
    },
    {
      name: "Secondary muscles",
      values: filterParams.secondaryMuscles,
      mode: "multiple",
      key: "secondaryMuscles",
    },
    {
      name: "Equipment",
      values: filterParams.equipment,
      mode: "multiple",
      key: "equipment",
    },
    {
      name: "Force",
      values: filterParams.force,
      mode: "multiple",
      key: "force",
    },
  ];

  return (
    <div className="mb-5">
      <Search />
      <Filter filters={filters} />
    </div>
  );
}
