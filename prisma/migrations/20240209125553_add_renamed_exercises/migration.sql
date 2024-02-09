/*
  Warnings:

  - You are about to drop the `Exrcises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Exrcises";

-- CreateTable
CREATE TABLE "Exercises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT,
    "images" TEXT[],
    "group" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("id")
);
