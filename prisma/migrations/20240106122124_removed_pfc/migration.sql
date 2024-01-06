/*
  Warnings:

  - You are about to drop the column `calories` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `carbohydrates` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `fats` on the `Nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `proteins` on the `Nutrition` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Nutrition" DROP COLUMN "calories",
DROP COLUMN "carbohydrates",
DROP COLUMN "fats",
DROP COLUMN "proteins",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
