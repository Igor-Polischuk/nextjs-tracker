import { User } from "@prisma/client";
import { prisma } from ".";

export type AddNutritionParams = {
  user: User;
  foodName: string;
  energy: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  amount: number;
};

export async function getDailyNutritionData(day: Date, userId: number) {
  const startOfDay = new Date(day);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(day);
  endOfDay.setHours(23, 59, 59, 999);

  const data = await prisma.nutrition.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      userId,
    },
    orderBy: {
      date: 'desc'
    },
    include: {
      food: true,
    },

  });

  return data;
}

export async function getFoodList(query?: string, take = 10) {
  const food = await prisma.food.findMany({
    where: {
      foodName: {
        contains: query,
        mode: "insensitive",
      },
    },
    take,
  });

  return food;
}

export const addNutrition = async (params: AddNutritionParams) => {
  const food = await prisma.food.findFirst({
    where: {
      foodName: params.foodName,
    },
  });

  if (food) {
    return await prisma.nutrition.create({
      data: {
        foodId: food.id,
        amount: params.amount,
        userId: params.user.id,
      },
    });
  }

  const newFood = await prisma.food.create({
    data: {
      calories: params.energy,
      carbohydrates: params.carbohydrates,
      fats: params.fats,
      foodName: params.foodName,
      proteins: params.proteins,
    },
  });

  return await prisma.nutrition.create({
    data: {
      foodId: newFood.id,
      amount: params.amount,
      userId: params.user.id,
    },
  });
};
