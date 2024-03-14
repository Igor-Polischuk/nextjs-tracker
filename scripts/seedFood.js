const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const foodsData = fs.readFileSync("./scripts/food.json", {
  encoding: "utf8",
  flag: "r",
});
const foods = JSON.parse(foodsData);

async function seed(prisma) {
  console.log("Start adding foods");

  await prisma.food.createMany({
    data: foods.map((food) => ({
      ...food,
    })),
  });

  console.log("Finished adding foods");
}

module.exports = {
  seedFood: seed,
};
