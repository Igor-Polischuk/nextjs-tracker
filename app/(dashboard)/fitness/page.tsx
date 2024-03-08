/* eslint-disable react/no-unescaped-entities */
import ButtonLink from "@/components/ButtonLink";
import ExercisesWidget from "@/components/ExercisesWidget";
import TrainingProgramsWidget from "@/components/TrainingProgramsWidget";
import { getUserTrainingPrograms } from "@/services/db/training-program";
import { getCurrentUser } from "@/services/db/user";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();
  const userPrograms = await getUserTrainingPrograms(user.id);

  return (
    <div>
      <ButtonLink
        href="/fitness/create-workout"
        color="primary"
        fullWidth
        size="lg"
        variant="faded"
      >
        Start training
      </ButtonLink>
      <TrainingProgramsWidget trainings={userPrograms} />
      <div>
        <h2 className="text-3xl mb-6 mt-10">My workouts</h2>
        <div className="flex flex-col justify-center items-center mb-4">
          <div className="bg-default-100 w-full p-5 rounded-lg">
            <div className="flex justify-between text-lg font-extrabold border-b-2 mb-3">
              <span>Fri, Feb 2</span>
              <span>1h 23m</span>
            </div>
            <div className="flex flex-col gap-4 border-b-2 mb-3 pb-3">
              <div className="flex justify-between flex-wrap">
                <p className="font-bold">Bench press</p>
                <p className="flex gap-5 max-w-full overflow-y-scroll">
                  <span>15x30kg</span>
                  <span>10x50kg</span>
                  <span>10x60kg</span>
                  <span>9x60kg</span>
                  <span>7x60kg</span>
                </p>
              </div>
              <div className="flex justify-between flex-wrap">
                <p className="font-bold">Biceps smth</p>
                <p className="flex gap-5 max-w-full overflow-y-scroll">
                  <span>15x20kg</span>
                  <span>10x30kg</span>
                  <span>10x30kg</span>
                  <span>9x30kg</span>
                </p>
              </div>
            </div>
            <div className="min-w-full flex justify-stretch">
              <Link className="text-primary w-full" href={"/workout/id"}>
                <Button className="text-primary" fullWidth variant="light">
                  See details
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Link
          href="workouts"
          className="text-primary flex w-full justify-center"
        >
          See all
        </Link>
        <ExercisesWidget />
      </div>
    </div>
  );
}
