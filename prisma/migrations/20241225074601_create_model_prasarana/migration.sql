-- AlterTable
ALTER TABLE "Artikel" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Prasarana" (
    "id_prasarana" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "condition" INTEGER NOT NULL,

    CONSTRAINT "Prasarana_pkey" PRIMARY KEY ("id_prasarana")
);
