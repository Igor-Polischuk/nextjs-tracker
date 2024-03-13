/*
  Warnings:

  - You are about to drop the column `type` on the `ProgramExercise` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `totalTime` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `WorkoutExercises` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `WorkoutExercises` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseId` to the `WorkoutExercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `WorkoutExrcisesSet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkoutExerciseSetType" AS ENUM ('WARM_UP', 'WORKING');

-- AlterTable
ALTER TABLE "ProgramExercise" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "date",
DROP COLUMN "totalTime",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutExercises" DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "exerciseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutExrcisesSet" ADD COLUMN     "type" "WorkoutExerciseSetType" NOT NULL;

-- DropEnum
DROP TYPE "TrainingActivityType";

-- AddForeignKey
ALTER TABLE "WorkoutExercises" ADD CONSTRAINT "WorkoutExercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
