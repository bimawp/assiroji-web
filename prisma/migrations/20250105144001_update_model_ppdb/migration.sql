/*
  Warnings:

  - Added the required column `brosur` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noRekBRI` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noWa` to the `PPDB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PPDB" ADD COLUMN     "brosur" TEXT NOT NULL,
ADD COLUMN     "noRekBRI" TEXT NOT NULL,
ADD COLUMN     "noWa" TEXT NOT NULL;
