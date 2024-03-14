const fs = require("fs");

function randomDate(lastNDays) {
  const today = new Date();
  const before = new Date();
  before.setDate(today.getDate() - lastNDays);
  return new Date(
    before.getTime() + Math.random() * (today.getTime() - before.getTime())
  );
}

const foodsData = fs.readFileSync("./scripts/food.json", {
  encoding: "utf8",
  flag: "r",
});
const foods = JSON.parse(foodsData).map((food, i) => ({
  ...food,
  foodId: i + 1,
}));

function generateNutritionData(foods, days = 5, userId = 1) {
  const nutritionData = [];
  for (let i = 0; i < 20; i++) {
    const food = foods[Math.floor(Math.random() * foods.length)];
    const date = randomDate(days - 1);
    nutritionData.push({
      userId,
      amount: Math.floor(Math.random() * 401) + 100,
      foodId: food.foodId,
      date,
    });
  }

  return nutritionData;
}

const nutrition = generateNutritionData(foods);

async function seed(prisma) {
  console.log("Start adding nutrition");

  await prisma.nutrition.createMany({
    data: nutrition.map((n) => ({
      ...n,
    })),
  });

  console.log("Finished adding foods");
}

module.exports = {
  seedNutrition: seed,
};
