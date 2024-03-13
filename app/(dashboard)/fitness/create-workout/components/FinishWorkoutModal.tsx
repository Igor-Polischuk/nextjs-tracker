import RadioTabs from "@/components/RadioTabs";
import { Workout, WorkoutExercise } from "@/contexts/workout-context";
import { CreateWorkoutType } from "@/services/db/workout";
import { getTimeBetweenDates } from "@/utils/get-time-between-dates";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";

type PropsTypes = {
  workout: Workout;
};

function FinishWorkoutModal({ workout }: PropsTypes) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const setsForPrimaryMuscles = useMemo(() => {
    const muscleSetsCount: { [key: string]: number } = {};

    // Function to accumulate sets for each primary muscle
    const accumulateSets = (exercise: WorkoutExercise) => {
      exercise.primaryMuscles.forEach((muscle) => {
        muscleSetsCount[muscle] =
          (muscleSetsCount[muscle] || 0) + exercise.sets.length;
      });
    };

    workout.prevExercises.forEach(accumulateSets);

    if (workout.currentExercise) {
      accumulateSets(workout.currentExercise);
    }

    return muscleSetsCount;
  }, [workout]);

  const handleFinish = async () => {
    const workoutData: CreateWorkoutType = {
      endTime: new Date(),
      startTime: workout.workoutStartTime!,
      exercises: workout.currentExercise
        ? [...workout.prevExercises, workout.currentExercise]
        : [...workout.prevExercises],
    };

    await fetch(`/api/workout`, {
      method: "POST",
      body: JSON.stringify(workoutData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/fitness");
    router.refresh();
  };

  return (
    <>
      <Button color="danger" variant="faded" onClick={onOpen}>
        Finish workout
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Workout summary</ModalHeader>
              <ModalBody>
                <p className="text-lg opacity-70 flex justify-between">
                  <span>Total time:</span>
                  <span>
                    {getTimeBetweenDates(workout.workoutStartTime!, new Date())}
                  </span>
                </p>
                <p className="text-xl opacity-90 flex justify-between">
                  Sets for each primary muscle group
                </p>
                <div>
                  {Object.keys(setsForPrimaryMuscles).map((muscle) => {
                    return (
                      <p
                        className="text-lg opacity-70 flex justify-between"
                        key={muscle}
                      >
                        <span>{muscle}</span>
                        <span>{setsForPrimaryMuscles[muscle]}</span>
                      </p>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    onClose();
                    handleFinish();
                  }}
                >
                  Finish
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default React.memo(FinishWorkoutModal);
