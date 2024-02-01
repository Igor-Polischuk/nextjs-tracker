import { signIn } from "@/auth";
import { NextResponse } from "next/server";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function POST(req: Request, res: Response) {
  try {
    const { username, password } = await req.json();
    await signIn("credentials", { username, password });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error.type === "CredentialsSignin") {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    } else {
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }
}
