import { addNutrition } from "@/services/db/nutrition";
import { getCurrentUser } from "@/services/db/user";
import { NextResponse } from "next/server";

export type CreateNutritionItem = {
  foodName: string;
  energy: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  amount: number;
}

export async function POST(req: Request, res: Response) {
  const data = (await req.json()) as CreateNutritionItem;
  const currentUser = await getCurrentUser();
  
  try {
    await addNutrition({ ...data, user: currentUser });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }

  return NextResponse.json({ success: true });
}
