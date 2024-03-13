import { getCurrentUser } from "@/services/db/user";
import { CreateWorkoutType, createWorkout } from "@/services/db/workout";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {
  const data = (await req.json()) as CreateWorkoutType;
  const currentUser = await getCurrentUser();

  try {
    await createWorkout(data, currentUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
