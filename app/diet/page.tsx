import NutritionTable from "@/components/NutritionTable";
import TodayNutritionStats from "@/components/TodayNutritionStats";
import { Button } from "@nextui-org/button";

export default async function Home() {

  return (
    <section>
      <TodayNutritionStats />
      <NutritionTable />
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
