import { Food, Nutrition } from "@prisma/client";

type NutritionSum = {
    energy: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
}

export function calculateTotal(per100: number, amount: number) {
    return per100 / 100 * amount
}

export function calculateNutrition(nutrition: (Nutrition & {food: Food})[]) {
    return nutrition.reduce<NutritionSum>((acc, curr) => {
        return {
            energy: acc.energy + calculateTotal(curr.food.calories, curr.amount),
            proteins: acc.proteins + calculateTotal(curr.food.proteins, curr.amount),
            fats: acc.fats + calculateTotal(curr.food.fats, curr.amount),
            carbohydrates: acc.carbohydrates + calculateTotal(curr.food.carbohydrates, curr.amount),
        }
    }, {
        energy: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
    })
}