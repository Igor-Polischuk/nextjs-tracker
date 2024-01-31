import ParamsCard from "@/components/ParamCard";
import TodayNutritionStats from "@/components/TodayNutritionStats";
import { getBMI, getUserBmr } from "@/sevices/body-params";
import { getDailyNutritionData } from "@/sevices/db/nutrition";
import { getCurrentUser } from "@/sevices/db/user";

export default async function Home() {
  const user = await getCurrentUser()
  const nutritionData = await getDailyNutritionData(new Date(), user.id)
  const bmi = getBMI(user.weight, user.height);
  const bmr = getUserBmr(user);

  return (
    <div>
      <h1 className="text-5xl font-bold">Hi, {user.username}!</h1>
      <div className="params-card">
        <ParamsCard title="Weight" value={`${user.weight}kg` }/>
        <ParamsCard title="Height" value={`${user.height}cm` }/>
        <ParamsCard title="BMI" value={`${bmi}`} />
        <ParamsCard title="Base kkal" value={`${bmr}`} />
      </div>
      <div className="mt-5 mb-5">
        <TodayNutritionStats nutritionData={nutritionData} user={user}/>
      </div>
    </div>
  );
}
