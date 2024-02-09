/*
  Warnings:

  - You are about to drop the column `description` on the `Exercises` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `Exercises` table. All the data in the column will be lost.
  - Added the required column `category` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipment` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `force` to the `Exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercises" DROP COLUMN "description",
DROP COLUMN "group",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "equipment" TEXT NOT NULL,
ADD COLUMN     "force" TEXT NOT NULL,
ADD COLUMN     "instructions" TEXT,
ADD COLUMN     "primaryMuscles" TEXT[],
ADD COLUMN     "secondaryMuscles" TEXT[];
