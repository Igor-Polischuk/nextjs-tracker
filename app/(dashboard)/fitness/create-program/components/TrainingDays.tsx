import React from "react";
import { DayTraining } from "./AddTrainingDay";
import Exercises from "./Exercises";

type PropTypes = {
  programTrainingByDays: DayTraining[];
};

export default function TrainingDays({ programTrainingByDays }: PropTypes) {
  return programTrainingByDays.map((trainInDay) => {
    return (
      <div
        key={trainInDay.dayName}
        className="flex flex-col w-full min-h-[200px] border-1 rounded-md p-5 mb-6"
      >
        <h2 className="text-xl font-black mb-5">{trainInDay.dayName}</h2>
        <div>
          <Exercises exercises={trainInDay.exercises} />
        </div>
      </div>
    );
  });
}
