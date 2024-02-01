import { SignUpUser } from "@/app/(auth)/sign-up/schema";
import { signUp } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const userData: SignUpUser = await req.json();

    const registeredUser = signUp(userData);

    return NextResponse.json({ success: true });
  } catch (error: any) {

    if (error.type === 'usernameTaken') {
        return NextResponse.json(
            { error: error.message },
            { status: 409 }
          );
    }

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
