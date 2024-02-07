/*
  Warnings:

  - The values [EXESRSISE] on the enum `TrainingActivityType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TrainingActivityType_new" AS ENUM ('REST', 'EXERCISE');
ALTER TABLE "ProgramExercise" ALTER COLUMN "type" TYPE "TrainingActivityType_new" USING ("type"::text::"TrainingActivityType_new");
ALTER TABLE "WorkoutExercises" ALTER COLUMN "type" TYPE "TrainingActivityType_new" USING ("type"::text::"TrainingActivityType_new");
ALTER TYPE "TrainingActivityType" RENAME TO "TrainingActivityType_old";
ALTER TYPE "TrainingActivityType_new" RENAME TO "TrainingActivityType";
DROP TYPE "TrainingActivityType_old";
COMMIT;
