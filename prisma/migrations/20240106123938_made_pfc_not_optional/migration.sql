/*
  Warnings:

  - Made the column `proteins` on table `Food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fats` on table `Food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carbohydrates` on table `Food` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Food" ALTER COLUMN "proteins" SET NOT NULL,
ALTER COLUMN "fats" SET NOT NULL,
ALTER COLUMN "carbohydrates" SET NOT NULL;
