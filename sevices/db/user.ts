import { User } from "@prisma/client";
import { prisma } from ".";

export async function getCurrentUser() {
  const user = await prisma.user.findFirst({
    where: {
      username: "Igor",
    },
  });

  if (!user) {
    // TODO removed it when implement auth logic
    // return createUser({});x
    // throw new Error('User not found')
  }

  return user;
}
// TODO refactor it when implement auth logic
async function createUser(data: unknown) {
  // const user = prisma.user.create({
  //   data: {
  //     firstName: "Igor",
  //     age: 21,
  //     height: 180,
  //     sex: "MALE",
  //     username: "Igor",
  //     weight: 78,
  //     activityLevel: "LIGHT_EXERCISE",
  //   },
  // });

  throw new Error('Not implemented "createUser"')

  return null;
}

export async function getUserByUsername(username: string): Promise<User | null> {
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
