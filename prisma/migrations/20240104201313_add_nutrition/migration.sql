-- CreateTable
CREATE TABLE "Nutrition" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Nutrition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Nutrition" ADD CONSTRAINT "Nutrition_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
