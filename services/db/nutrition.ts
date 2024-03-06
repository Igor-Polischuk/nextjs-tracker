import { Food, Nutrition, User } from "@prisma/client";
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

type TotalReturnType = {
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
  user: User;
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

  return data;
}

export async function getNutritionByDays(userId: number) {
  const nutrition = await prisma.nutrition.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "asc",
    },
    include: {
      food: true,
    },
  });

  const groupedByDate = nutrition.reduce<
    Record<string, (Nutrition & { food: Food })[]>
  >((groupedByDate, item) => {
    const itemDate = new Date(item.date);
    const dateYMD = itemDate.toISOString().split("T")[0];
    if (!groupedByDate[dateYMD]) {
      groupedByDate[dateYMD] = [];
    }
    groupedByDate[dateYMD] = [...groupedByDate[dateYMD], item];
    return groupedByDate;
  }, {});

  return groupedByDate;
}

export function calculateNutritionTotal(
  nutrition: (Nutrition & { food: Food })[]
) {
  return nutrition.reduce<TotalReturnType>(
    (totalObj, current) => {
      return {
        energy: totalObj.energy + current.food.calories,
        proteins: totalObj.proteins + current.food.proteins,
        fats: totalObj.fats + current.food.fats,
        carbohydrates: totalObj.carbohydrates + current.food.carbohydrates,
        amount: totalObj.amount + current.amount,
      };
    },
    {
      energy: 0,
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
      amount: 0,
    }
  );
}

export async function getFoodList(userId: number, query?: string, take = 10) {
  const food = await prisma.food.findMany({
    where: {
      foodName: {
        contains: query,
        mode: "insensitive",
      },
      userId,
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
    user: params.user,
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
      userId: data.user.id,
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
