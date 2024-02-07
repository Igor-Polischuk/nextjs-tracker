import {
  ProgramData,
  createTrainingProgram,
} from "@/sevices/db/training-program";
import { getCurrentUser } from "@/sevices/db/user";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const data = (await req.json()) as ProgramData;
  const currentUser = await getCurrentUser();

  try {
    await createTrainingProgram(data, currentUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
