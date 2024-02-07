import NutritionByDays from "@/components/NutritionByDays";
import NutritionTable from "@/components/NutritionTable";
import TodayNutritionStats from "@/components/TodayNutritionStats";
import {
  getDailyNutritionData,
  getNutritionByDays,
} from "@/services/db/nutrition";
import { getCurrentUser } from "@/services/db/user";
import { Button } from "@nextui-org/button";

export default async function Page() {
  const user = await getCurrentUser();
  const nutritionData = await getDailyNutritionData(new Date(), user.id);
  const nutritionByDate = await getNutritionByDays(user.id);
  return (
    <section>
      <TodayNutritionStats nutritionData={nutritionData} user={user} />
      <NutritionTable nutritionData={nutritionData} />
      <NutritionByDays nutritionByDate={nutritionByDate} />
      {/* <Button
        className="min-w-full mt-5 sm:mt-0 sm:w-auto max-w-[382px]"
        variant="solid"
        color="success"
      >
        See more
      </Button> */}
    </section>
  );
}
