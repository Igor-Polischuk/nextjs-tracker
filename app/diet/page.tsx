import DayCaloriesCounter from "@/components/DayCaloriesCounter";
import NutritionTable from "@/components/NutritionTable";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <section>
      <div className="flex flex-col  justify-between items-center sm:flex-row">
        <div className="self-start">
          <DayCaloriesCounter />
        </div>
        <Button
          className="w-full mt-5 sm:mt-0 sm:w-auto max-w-[382px]"
          variant="shadow"
          color="primary"
        >
          Add a meal
        </Button>
      </div>
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
