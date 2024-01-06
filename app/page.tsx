import DayCaloriesCounter from "@/components/DayCaloriesCounter";
import ParamsCard from "@/components/ParamCard";
import TodayNutritionStats from "@/components/TodayNutritionStats";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl font-bold">Hi, Username!</h1>
      <div className="params-card">
        <ParamsCard title="Weight" value="80kg" />
        <ParamsCard title="Height" value="181cm" />
        <ParamsCard title="BMI" value="25" />
        <ParamsCard title="Calories" value="2600" />
      </div>
      <div className="mt-5 mb-5">
        <TodayNutritionStats />
      </div>
    </div>
  );
}
