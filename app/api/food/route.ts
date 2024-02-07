import { getFoodList } from "@/services/db/nutrition";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const foodList = await getFoodList();
  return NextResponse.json(foodList);
}
