import { CreateFoodForm } from "@/app/(dashboard)/diet/create-meal/schema";
import { createFood, getFoodList } from "@/services/db/nutrition";
import { getCurrentUser } from "@/services/db/user";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const currentUser = await getCurrentUser();
  const foodList = await getFoodList(currentUser.id);
  return NextResponse.json(foodList);
}

export async function POST(req: Request, res: Response) {
  const foodData = (await req.json()) as CreateFoodForm;
  const currentUser = await getCurrentUser();
  const newFood = await createFood({
    ...foodData,
    user: currentUser,
    calories: foodData.energy,
  });
  return NextResponse.json(newFood);
}
