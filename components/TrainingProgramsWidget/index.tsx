/* eslint-disable react/no-unescaped-entities */
import { getUserTrainingPrograms } from "@/services/db/training-program";
import Link from "next/link";
import React from "react";
import ButtonLink from "../ButtonLink";

type PropTypes = {
  trainings: Awaited<ReturnType<typeof getUserTrainingPrograms>>;
};

export default function TrainingProgramsWidget({ trainings }: PropTypes) {
  const hasPrograms = !!trainings.length;
  return (
    <div>
      <h2 className="text-3xl mb-6 mt-10">My programs</h2>
      <div className="flex flex-col justify-center items-center">
        {hasPrograms &&
          trainings.map((training) => {
            return (
              <div
                key={training.id}
                className="min-w-full flex justify-between items-center"
              >
                <div className="flex flex-col ">
                  <p className="text-xl font-medium">{training.title}</p>
                </div>
                <Link
                  href={`/fitness/program/${training.id}`}
                  className="block text-primary hover:underline"
                >
                  Discover program
                </Link>
              </div>
            );
          })}
        {!hasPrograms && <p>You haven't created training program yet</p>}
        <ButtonLink href="/fitness/create-program" variant="bordered">Create program</ButtonLink>
      </div>
    </div>
  );
}
