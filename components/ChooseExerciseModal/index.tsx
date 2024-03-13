import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Exercises } from "@prisma/client";
import React, { useEffect, useState } from "react";

type PropTypes = {
  children?: JSX.Element;
  onExerciseSelect: (exercise: Exercises) => void;
};

export default function ChooseExerciseModal({
  children,
  onExerciseSelect,
}: PropTypes) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [exercises, setExercises] = useState<Exercises[]>([]);
  const [chosenExercise, setChosenExercise] = useState<Exercises | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/exercises")
      .then((data) => data.json())
      .then(setExercises);
  }, []);

  const filterExercisesBySearch = (exercises: Exercises[]) => {
    const searchQuery = search.trim().toLocaleLowerCase();

    return exercises.filter((exercise) => {
      return (
        exercise.name.toLowerCase().includes(searchQuery.trim()) ||
        exercise.primaryMuscles.some((muscle) =>
          muscle.includes(searchQuery)
        ) ||
        exercise.secondaryMuscles.some((muscle) =>
          muscle.includes(searchQuery)
        ) ||
        exercise.force.includes(searchQuery)
      );
    });
  };

  const resetStates = () => {
    setSearch("");
    setChosenExercise(null);
  };

  const getExerciseClassNames = (exerciseId: string) => {
    const isChosen = exerciseId === chosenExercise?.id;

    return isChosen ? "bg-primary-300" : "bg-default-100";
  };

  return (
    <>
      <Button onClick={onOpen} fullWidth>Start new exercise</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          resetStates();
        }}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Choose exercise</ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Search by exercise name, muscle name, force"
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  value={search}
                  isClearable
                  onClear={() => setSearch("")}
                />
                <ScrollShadow className="h-80">
                  {filterExercisesBySearch(exercises).map((exercise) => {
                    return (
                      <div
                        key={exercise.id}
                        className={`px-4 py-3 mb-4 rounded-lg cursor-pointer ${getExerciseClassNames(
                          exercise.id
                        )}`}
                        onClick={() => setChosenExercise(exercise)}
                      >
                        <p>{exercise.name}</p>
                        <p className="text-sm opacity-70">
                          Primary: {exercise.primaryMuscles.join(", ")}
                        </p>
                        {!!exercise.secondaryMuscles.length && (
                          <p className="text-sm opacity-70">
                            Secondary: {exercise.secondaryMuscles.join(", ")}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    onClose();
                    resetStates();
                    onExerciseSelect(chosenExercise!);
                  }}
                  isDisabled={!chosenExercise}
                >
                  Choose
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
