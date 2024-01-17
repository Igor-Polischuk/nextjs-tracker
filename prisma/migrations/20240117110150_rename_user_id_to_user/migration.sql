/*
  Warnings:

  - Added the required column `userId` to the `Nutrition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Nutrition" DROP CONSTRAINT "Nutrition_id_fkey";

-- AlterTable
ALTER TABLE "Nutrition" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Nutrition" ADD CONSTRAINT "Nutrition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
