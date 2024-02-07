/*
  Warnings:

  - You are about to drop the `ProgramExercises` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `TrainingProgram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TrainingProgram` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `TrainingProgram` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProgramExercises" DROP CONSTRAINT "ProgramExercises_programId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramExercisesSet" DROP CONSTRAINT "ProgramExercisesSet_programExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingProgram" DROP CONSTRAINT "TrainingProgram_userId_fkey";

-- AlterTable
ALTER TABLE "TrainingProgram" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "ProgramExercises";

-- CreateTable
CREATE TABLE "ProgramExercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TrainingActivityType" NOT NULL,
    "programId" TEXT NOT NULL,
    "description" TEXT,
    "days" "WeekDay"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramExercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainingProgram" ADD CONSTRAINT "TrainingProgram_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramExercise" ADD CONSTRAINT "ProgramExercise_programId_fkey" FOREIGN KEY ("programId") REFERENCES "TrainingProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramExercisesSet" ADD CONSTRAINT "ProgramExercisesSet_programExerciseId_fkey" FOREIGN KEY ("programExerciseId") REFERENCES "ProgramExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
