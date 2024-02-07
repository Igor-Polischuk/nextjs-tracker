/*
  Warnings:

  - You are about to drop the column `days` on the `ProgramExercise` table. All the data in the column will be lost.
  - Added the required column `day` to the `ProgramExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProgramExercise" DROP COLUMN "days",
ADD COLUMN     "day" TEXT NOT NULL;
