const { seedExercise } = require("./seedExercises");
const { seedFood } = require("./seedFood");
const { seedNutrition } = require("./seedNutrition");

async function seed() {
  await seedExercise();
  await seedFood();
  await seedNutrition();
}

seed();
