/*
  Warnings:

  - You are about to drop the `DataDaftar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Form` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RiwayatDaftar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DataDaftar" DROP CONSTRAINT "DataDaftar_idRiwayat_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_idRiwayat_fkey";

-- DropForeignKey
ALTER TABLE "RiwayatDaftar" DROP CONSTRAINT "RiwayatDaftar_idUser_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_ekstrakurikulerId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_galleryId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_pageId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id_user" SET DEFAULT gen_random_uuid();

-- DropTable
DROP TABLE "DataDaftar";

-- DropTable
DROP TABLE "Form";

-- DropTable
DROP TABLE "Page";

-- DropTable
DROP TABLE "RiwayatDaftar";

-- DropTable
DROP TABLE "Section";

-- CreateTable
CREATE TABLE "PPDB" (
    "id_ppdb" TEXT NOT NULL,
    "namaPPDB" TEXT NOT NULL,
    "tahunAjaran" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'dibuka',
    "jumlahKuota" INTEGER,

    CONSTRAINT "PPDB_pkey" PRIMARY KEY ("id_ppdb")
);

-- CreateTable
CREATE TABLE "DataPendaftar" (
    "id_data_pendaftar" TEXT NOT NULL,
    "id_ppdb" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "statusPendaftaran" TEXT NOT NULL DEFAULT 'proses',
    "tanggalPendaftaran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DataPendaftar_pkey" PRIMARY KEY ("id_data_pendaftar")
);

-- CreateTable
CREATE TABLE "FormulirPendaftaran" (
    "id_formulir_pendaftar" TEXT NOT NULL,
    "id_data_pendaftar" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "tempatTanggalLahir" TEXT NOT NULL,
    "asalSekolah" TEXT NOT NULL,
    "namaIbu" TEXT NOT NULL,
    "pendidikanTerakhirIbu" TEXT NOT NULL,
    "pekerjaanIbu" TEXT NOT NULL,
    "namaAyah" TEXT NOT NULL,
    "pendidikanTerakhirAyah" TEXT NOT NULL,
    "pekerjaanAyah" TEXT NOT NULL,
    "alamatLengkap" TEXT NOT NULL,
    "noTelepon" VARCHAR(15) NOT NULL,

    CONSTRAINT "FormulirPendaftaran_pkey" PRIMARY KEY ("id_formulir_pendaftar")
);

-- CreateTable
CREATE TABLE "RiwayatPPDB" (
    "id_riwayat_ppdb" TEXT NOT NULL,
    "id_data_pendaftar" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "keterangan" TEXT,
    "tanggalRiwayat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiwayatPPDB_pkey" PRIMARY KEY ("id_riwayat_ppdb")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormulirPendaftaran_id_data_pendaftar_key" ON "FormulirPendaftaran"("id_data_pendaftar");

-- AddForeignKey
ALTER TABLE "DataPendaftar" ADD CONSTRAINT "DataPendaftar_id_ppdb_fkey" FOREIGN KEY ("id_ppdb") REFERENCES "PPDB"("id_ppdb") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataPendaftar" ADD CONSTRAINT "DataPendaftar_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormulirPendaftaran" ADD CONSTRAINT "FormulirPendaftaran_id_data_pendaftar_fkey" FOREIGN KEY ("id_data_pendaftar") REFERENCES "DataPendaftar"("id_data_pendaftar") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiwayatPPDB" ADD CONSTRAINT "RiwayatPPDB_id_data_pendaftar_fkey" FOREIGN KEY ("id_data_pendaftar") REFERENCES "DataPendaftar"("id_data_pendaftar") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiwayatPPDB" ADD CONSTRAINT "RiwayatPPDB_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
