/*
  Warnings:

  - You are about to drop the column `foodName` on the `Nutrition` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodId` to the `Nutrition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nutrition" DROP COLUMN "foodName",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "foodId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Nutrition" ADD CONSTRAINT "Nutrition_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
