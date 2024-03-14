const bcrypt = require("bcrypt");

async function createUser(prisma) {
  console.log("creating user...");

  const password = await bcrypt.hash("123123", 10);
  const userData = {
    firstName: "root",
    lastName: "root",
    username: "root",
    password,
    sex: "MALE",
    activityLevel: "LIGHT_EXERCISE",
    height: 181,
    weight: 83,
    age: 21,
  };

  const user = await prisma.user.create({
    data: { ...userData },
  });
  console.log("created user");

  return user;
}

module.exports = {
  createUser,
};
