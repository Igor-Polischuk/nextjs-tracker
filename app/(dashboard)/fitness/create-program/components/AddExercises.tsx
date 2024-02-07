"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import React, { useState } from "react";
import AddSet, { Set } from "./AddSet";

export type Exercise = {
  name: string;
  description: string;
  sets: Set[];
};

type PropTypes = {
  onSetExercise: (exercise: Exercise) => void;
};

export default function AddExercises({ onSetExercise }: PropTypes) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sets, setSet] = useState<Set[]>([]);

  const isButtonDisabled = !name || !sets.length;

  const resetForm = () => {
    setName("");
    setDescription("");
    setSet([]);
  };

  return (
    <div>
      <Button fullWidth color="primary" variant="bordered" onPress={onOpen}>
        Add exercise
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          resetForm();
        }}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add exercise
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Exercise name"
                  onChange={(e) => setName(e.currentTarget.value)}
                  value={name}
                />
                <Textarea
                  label="Description"
                  onChange={(e) => setDescription(e.currentTarget.value)}
                  value={description}
                />
                <AddSet setSet={setSet} sets={sets} />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    onSetExercise({
                      name,
                      description,
                      sets,
                    });
                    resetForm();
                    onClose();
                  }}
                  disabled={isButtonDisabled}
                >
                  Add exercise
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
