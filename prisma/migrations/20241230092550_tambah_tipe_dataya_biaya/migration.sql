/*
  Warnings:

  - You are about to alter the column `biayaBulanan` on the `PPDB` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `biayaPendaftaran` on the `PPDB` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `biayaSeragam` on the `PPDB` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "PPDB" ALTER COLUMN "biayaBulanan" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "biayaPendaftaran" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "biayaSeragam" SET DATA TYPE DECIMAL(10,2);
