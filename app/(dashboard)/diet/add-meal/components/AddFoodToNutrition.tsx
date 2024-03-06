"use client";

import FoodCard from "@/components/FoodCard";
import { Food } from "@prisma/client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { uppercaseFirstLetter } from "@/utils/uppercase-first-letter";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { CreateNutritionItem } from "@/app/api/nutrition/route";

type AddNutritionProps = Food;

export default function AddFoodToNutrition(food: AddNutritionProps) {
  const [amount, setAmount] = useState("");
  const caloriesPerGram = food.calories / 100;
  const proteinsPerGram = food.proteins / 100;
  const carbohydratesPerGram = food.carbohydrates / 100;
  const fatsPerGram = food.fats / 100;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const calculateTotal = (perGram: number) => {
    const amountNumber = Number(amount);
    return (amountNumber * perGram).toFixed(2);
  };

  const handleChange = (inputtedAmount: string) => {
    setAmount(inputtedAmount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nutritionData: CreateNutritionItem = {
      ...food,
      amount: Number(amount),
      energy: food.calories
    };
    await fetch(`/api/nutrition`, {
      method: "POST",
      body: JSON.stringify(nutritionData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/diet");
    router.refresh();
  };

  return (
    <>
      <div className="cursor-pointer" key={food.id} onClick={onOpen}>
        <FoodCard {...food} />
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          // resetForm();
        }}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>Add food intake data </ModalHeader>
              <ModalBody>
                <div className="flex justify-between items-center">
                  <h6 className="text-xl">
                    {uppercaseFirstLetter(food.foodName)}
                  </h6>
                  <p>
                    <span>{food.calories}</span>
                    <span>kcal</span>
                  </p>
                </div>
                <div className="flex justify-between flex-wrap">
                  <p className="text-cyan-600">Proteins: {food.proteins}</p>
                  <p className="text-amber-300">Fats: {food.fats}</p>
                  <p className="text-emerald-600">
                    Carbohydrates: {food.carbohydrates}
                  </p>
                </div>
                <div className="my-5">
                  <Input
                    placeholder="Amount"
                    labelPlacement="outside"
                    label="Total amount:"
                    endContent="g"
                    type="number"
                    size="lg"
                    value={amount}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="text-xl">Total:</h6>
                  <p>
                    <span>{calculateTotal(caloriesPerGram)}</span>
                    <span>kcal</span>
                  </p>
                </div>
                <div className="flex justify-between flex-wrap">
                  <p className="text-cyan-600">
                    Proteins: {calculateTotal(proteinsPerGram)}
                  </p>
                  <p className="text-amber-300">
                    Fats: {calculateTotal(fatsPerGram)}
                  </p>
                  <p className="text-emerald-600">
                    Carbohydrates: {carbohydratesPerGram}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => {
                    // resetForm();
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  onClick={() => {
                    // resetForm();
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
