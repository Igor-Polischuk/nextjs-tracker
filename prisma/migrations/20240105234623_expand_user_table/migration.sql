/*
  Warnings:

  - Added the required column `height` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('BULKING', 'CUTTING', 'MAINTENACE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "goal" "Goal" NOT NULL DEFAULT 'MAINTENACE',
ADD COLUMN     "height" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "UserWeigtDynamic" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UserWeigtDynamic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserWeigtDynamic" ADD CONSTRAINT "UserWeigtDynamic_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
