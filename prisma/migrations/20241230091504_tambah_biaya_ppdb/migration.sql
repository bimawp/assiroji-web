/*
  Warnings:

  - Added the required column `jenjang` to the `DataPendaftar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `biayaBulanan` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `biayaPendaftaran` to the `PPDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `biayaSeragam` to the `PPDB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataPendaftar" ADD COLUMN     "jenjang" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PPDB" ADD COLUMN     "biayaBulanan" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "biayaPendaftaran" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "biayaSeragam" DECIMAL(65,30) NOT NULL;
