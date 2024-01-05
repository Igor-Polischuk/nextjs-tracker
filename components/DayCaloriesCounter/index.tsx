/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function DayCaloriesCounter() {
  return (
    <div>
      <p className="text-2xl font-medium">
        Today you've eaten: {"  "}
        <br className="xs:hidden" />
        <span className="text-4xl font-extralight	">1742</span> /
        <span>2700</span>
      </p>
      <div className="flex xs:gap-5 font-light opacity-75 text-sm flex-col xs:flex-row">
        <p className="text-cyan-600">Proteins: 73 / 130</p>
        <p className="text-amber-300">Fats: 20 / 60</p>
        <p className="text-emerald-600">Carbohydrates: 80 / 180</p>
      </div>
    </div>
  );
}
