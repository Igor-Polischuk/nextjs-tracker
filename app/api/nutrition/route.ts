import { CreateMealForm } from "@/app/diet/add-meal/schema";
import { addNutrition } from "@/lib/db/nutrition";
import { getCurrentUser } from "@/lib/db/user";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const data = (await req.json()) as CreateMealForm;
  const currentUser = await getCurrentUser();
  
  try {
    await addNutrition({ ...data, user: currentUser });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error });
  }

  return NextResponse.json({ success: true });
}
