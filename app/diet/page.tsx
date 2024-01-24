import NutritionTable from "@/components/NutritionTable";
import TodayNutritionStats from "@/components/TodayNutritionStats";
import { getDailyNutritionData } from "@/lib/db/nutrition";
import { getCurrentUser } from "@/lib/db/user";
import { Button } from "@nextui-org/button";

export default async function Page() {
  const user = await getCurrentUser()
  const nutritionData = await getDailyNutritionData(new Date(), user.id)

  return (
    <section>
      <TodayNutritionStats />
      <NutritionTable user={user} nutritionData={nutritionData}/>
      <Button
          className="min-w-full mt-5 sm:mt-0 sm:w-auto max-w-[382px]"
          variant="solid"
          color="success"
        >
          See more
        </Button>
    </section>
  );
}
