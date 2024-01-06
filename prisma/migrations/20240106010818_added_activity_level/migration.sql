/*
  Warnings:

  - Added the required column `activityLevel` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('1.2', '1.37', '1.55', '1.725', '1.9');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activityLevel" "ActivityLevel" NOT NULL,
ADD COLUMN     "age" INTEGER NOT NULL;
