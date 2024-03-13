import { CreateFoodForm } from "@/app/(dashboard)/diet/create-meal/schema";
import { getPublicExercises } from "@/services/db/exercises";
import { createFood, getFoodList } from "@/services/db/nutrition";
import { getCurrentUser } from "@/services/db/user";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    const currentUser = await getCurrentUser();
    const foodList = await getPublicExercises()
    return NextResponse.json(foodList);
  }