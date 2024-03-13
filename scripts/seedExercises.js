const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient();

const exercisesData = fs.readFileSync("./scripts/exercises.json", {
  encoding: "utf8",
  flag: "r",
});
const exercises = JSON.parse(exercisesData);

async function seed() {
  console.log("start adding exercises");
  await prisma.exercises.createMany({
    data: exercises,
  });
  console.log("finished adding exercises");
}

seed();

module.exports = {
  seedExercise: seed,
};
