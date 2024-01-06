import { ActivityLevel, Sex, User } from "@prisma/client";

const activityLevelCoefficient = {
  [ActivityLevel.EXTRA_ACTIVE]: 1.2,
  [ActivityLevel.LIGHT_EXERCISE]: 1.37,
  [ActivityLevel.LITTLE_TO_NO_EXERCISE]: 1.55,
  [ActivityLevel.MODERATE_EXERCISE]: 1.725,
  [ActivityLevel.VERY_ACTIVE]: 1.9,
};

const PROTEIN_PER_BODY_KG = 2;
const FAT_PERCENTAGE_PER_DAY = 0.25;
const FAT_PER_BODY_KG = 1;
const CARBOHYDRATES_PER_BODY_KG = 2;

export function getBMI(weight: number, height: number) {
  const heightInM = height / 100;
  return Math.round(weight / (heightInM * heightInM));
}

export function getUserBmr(user: User) {
  const coefficients = {
    [Sex.MALE]: [10, 6.25, 5, 5],
    [Sex.FEMALE]: [10, 6.25, 5, -161],
  };

  const currentCf = coefficients[user.sex];
  const bmr =
    currentCf[0] * user.weight +
    currentCf[1] * user.height -
    currentCf[2] * user.age +
    currentCf[3];

  return Math.round(bmr);
}

export function getUserCaloriesNorm(user: User) {
  return Math.round(
    getUserBmr(user) * activityLevelCoefficient[user.activityLevel]
  );
}

export function getUserProteinsNorm(userWeight: number) {
  return Math.round(userWeight * PROTEIN_PER_BODY_KG);
}

export function getUserFatsNorm(userWeight: number) {
  return Math.round(userWeight * FAT_PER_BODY_KG);
}

export function getUserCarbohydratesNorm(userWeight: number) {
  return Math.round(userWeight * CARBOHYDRATES_PER_BODY_KG);
}

export function getPFC(userWeight: number) {
  const proteins = getUserProteinsNorm(userWeight);
  const fats = getUserFatsNorm(userWeight);
  const carbohydrates = getUserCarbohydratesNorm(userWeight);

  return {
    proteins,
    fats,
    carbohydrates,
  };
}
