/*
  Warnings:

  - The primary key for the `Guru` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_sarana` on the `Guru` table. All the data in the column will be lost.
  - The required column `id_guru` was added to the `Guru` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Guru" DROP CONSTRAINT "Guru_pkey",
DROP COLUMN "id_sarana",
ADD COLUMN     "id_guru" TEXT NOT NULL,
ADD CONSTRAINT "Guru_pkey" PRIMARY KEY ("id_guru");
