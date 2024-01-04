/*
  Warnings:

  - Added the required column `calories` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodName` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Nutrition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nutrition" ADD COLUMN     "calories" INTEGER NOT NULL,
ADD COLUMN     "carbohydrates" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fats" INTEGER,
ADD COLUMN     "foodName" TEXT NOT NULL,
ADD COLUMN     "proteins" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "foodName" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "proteins" INTEGER,
    "fats" INTEGER,
    "carbohydrates" INTEGER,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);
