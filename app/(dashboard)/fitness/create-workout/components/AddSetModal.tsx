import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import RadioTabs from "@/components/RadioTabs";
import {
  WorkoutExerciseSet,
  WorkoutExerciseSetType,
} from "@/contexts/workout-context";
import { Input } from "@nextui-org/input";

const radioItems = [
  {
    value: WorkoutExerciseSetType.WARM_UP,
    title: "Warm up",
  },
  {
    value: WorkoutExerciseSetType.WORKING,
    title: "Working",
  },
];

type PropTypes = {
  onAddSet: (setInfo: WorkoutExerciseSet) => void;
  buttonProps?: React.ComponentProps<typeof Button>;
};

export default function AddSetModal({ onAddSet, buttonProps }: PropTypes) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [setType, setSetType] = useState(WorkoutExerciseSetType.WORKING);
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const resetStates = () => {
    setReps("");
    setWeight("");
    setSetType(WorkoutExerciseSetType.WORKING);
  };

  return (
    <>
      <Button onClick={onOpen} {...buttonProps}>Add set</Button>
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
              <ModalHeader>Add set</ModalHeader>
              <ModalBody>
                <RadioTabs
                  items={radioItems}
                  setValue={setSetType}
                  value={setType}
                  color="primary"
                />
                <Input
                  placeholder="Reps"
                  onChange={(e) => setReps(e.currentTarget.value)}
                  value={reps}
                />
                <Input
                  placeholder="Weight"
                  onChange={(e) => setWeight(e.currentTarget.value)}
                  value={weight}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    onClose();
                    resetStates();
                    onAddSet({
                      reps: Number(reps),
                      weights: Number(weight),
                      type: setType,
                    });
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
