/*
  Warnings:

  - You are about to drop the column `metodePembayaran` on the `DataDaftar` table. All the data in the column will be lost.
  - You are about to drop the column `statusPembayaran` on the `DataDaftar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DataDaftar" DROP COLUMN "metodePembayaran",
DROP COLUMN "statusPembayaran",
ADD COLUMN     "statusPendaftaran" TEXT NOT NULL DEFAULT 'ditutup';
