import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import React from 'react'
import FoodList from './FoodList'
import { Food } from '@prisma/client'

type PropTypes = {
    foodList: Food[],
    setFood: (food: Food) => void
    setShowFoodList: (value: boolean) => void
}

export default function SavedFood({foodList, setFood, setShowFoodList}: PropTypes) {
  return (
    <div>
    <Input label="Search by name" />
    <FoodList foodList={foodList} setFood={setFood} />
    <Button
      size="lg"
      color="primary"
      variant="shadow"
      className="w-full mb-auto"
      onClick={() => setShowFoodList(false)}
    >
      Go back
    </Button>
  </div>
  )
}
