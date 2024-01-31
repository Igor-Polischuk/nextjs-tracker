import { prisma } from ".";

export async function getCurrentUser() {
  const user = await prisma.user.findFirst({
    where: {
      username: "Igor",
    },
  });

  if (!user) {
    // TODO removed it when implement auth logic
    return createUser({});
    // throw new Error('User not found')
  }

  return user;
}
// TODO refactor it when implement auth logic
async function createUser(data: unknown) {
  const user = prisma.user.create({
    data: {
      name: "Igor",
      age: 21,
      height: 180,
      sex: "MALE",
      username: "Igor",
      weight: 78,
      activityLevel: "LIGHT_EXERCISE",
    },
  });

  return user;
}
