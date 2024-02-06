import { User } from "@prisma/client";
import { prisma } from ".";
import { revalidatePath } from "next/cache";

export type AddNutritionParams = {
  user: User;
  foodName: string;
  energy: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  amount: number;
};

type CreateFood = {
  calories: number;
  carbohydrates: number;
  fats: number;
  foodName: string;
  proteins: number;
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
      date: "desc",
    },
    include: {
      food: true,
    },
  });

  return data.map((item) => ({
    ...item,
    carbohydrates: Math.round(item.food.carbohydrates),
    calories: Math.round(item.food.calories),
    fats: Math.round(item.food.fats),
    proteins: Math.round(item.food.proteins),
    amount: Math.round(item.food.proteins),
  }));
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
  const food = await getOrCreateFood({
    calories: params.energy,
    carbohydrates: params.carbohydrates,
    fats: params.fats,
    foodName: params.foodName,
    proteins: params.proteins,
  });

  const nutritionItem = await prisma.nutrition.create({
    data: {
      foodId: food.id,
      amount: params.amount,
      userId: params.user.id,
    },
  });

  revalidatePath("/diet", "page");
  return nutritionItem;
};

export async function createFood(data: CreateFood) {
  return prisma.food.create({
    data: {
      calories: data.calories,
      carbohydrates: data.carbohydrates,
      fats: data.fats,
      foodName: data.foodName,
      proteins: data.proteins,
    },
  });
}

async function getOrCreateFood(data: CreateFood) {
  const food = await prisma.food.findFirst({
    where: {
      foodName: data.foodName,
    },
  });

  if (food) {
    return food;
  }

  return createFood(data);
}
