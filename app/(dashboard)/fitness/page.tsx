/* eslint-disable react/no-unescaped-entities */
import ButtonLink from "@/components/ButtonLink";
import ExercisesWidget from "@/components/ExercisesWidget";
import TrainingProgramsWidget from "@/components/TrainingProgramsWidget";
import WorkoutPreview from "@/components/WorkoutPreview";
import { getUserTrainingPrograms } from "@/services/db/training-program";
import { getCurrentUser } from "@/services/db/user";
import { getUserWorkouts } from "@/services/db/workout";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();
  const userPrograms = await getUserTrainingPrograms(user.id);
  const userWorkouts = await getUserWorkouts(user.id);

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
        {!userWorkouts.length && <p>You haven't had any workout yet</p>}
        {userWorkouts.map((workout) => {
          return <WorkoutPreview key={workout.id} workout={workout} />;
        })}
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
