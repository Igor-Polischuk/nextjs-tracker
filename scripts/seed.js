const { seedExercise } = require("./seedExercises");
const { seedFood } = require("./seedFood");
const { seedNutrition } = require("./seedNutrition");
const { createUser } = require("./createUser");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  await createUser(prisma);
  await seedExercise(prisma);
  await seedFood(prisma);
  await seedNutrition(prisma);
}

seed();
