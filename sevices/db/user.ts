import { User } from "@prisma/client";
import { prisma } from ".";
import { SignUpUser } from "@/app/(auth)/sign-up/schema";
import { auth } from "@/auth";

export async function getCurrentUser() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw new Error('Problem with getting user id from session')
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId)
    },
  });

  return user!;
}


export async function createUser(userData: SignUpUser) {
  const user = prisma.user.create({
    data: { ...userData },
  });

  return user;
}

export async function getUserByUsername(
  username: string
): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}
