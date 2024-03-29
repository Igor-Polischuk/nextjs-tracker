const fs = require("fs");

const exercisesData = fs.readFileSync("./scripts/exercises.json", {
  encoding: "utf8",
  flag: "r",
});
const exercises = JSON.parse(exercisesData);

async function seed(prisma) {
  console.log("start adding exercises");
  await prisma.exercises.createMany({
    data: exercises,
  });
  console.log("finished adding exercises");
}

module.exports = {
  seedExercise: seed,
};
