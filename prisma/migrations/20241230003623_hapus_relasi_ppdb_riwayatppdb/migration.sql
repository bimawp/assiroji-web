/*
  Warnings:

  - You are about to drop the column `id_data_pendaftar` on the `FormulirPendaftaran` table. All the data in the column will be lost.
  - You are about to drop the column `id_data_pendaftar` on the `RiwayatPPDB` table. All the data in the column will be lost.
  - Added the required column `jenisPendaftaran` to the `DataPendaftar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `FormulirPendaftaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_ppdb` to the `RiwayatPPDB` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FormulirPendaftaran" DROP CONSTRAINT "FormulirPendaftaran_id_data_pendaftar_fkey";

-- DropForeignKey
ALTER TABLE "RiwayatPPDB" DROP CONSTRAINT "RiwayatPPDB_id_data_pendaftar_fkey";

-- DropIndex
DROP INDEX "FormulirPendaftaran_id_data_pendaftar_key";

-- AlterTable
ALTER TABLE "DataPendaftar" ADD COLUMN     "jenisPendaftaran" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FormulirPendaftaran" DROP COLUMN "id_data_pendaftar",
ADD COLUMN     "id_user" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RiwayatPPDB" DROP COLUMN "id_data_pendaftar",
ADD COLUMN     "id_ppdb" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FormulirPendaftaran" ADD CONSTRAINT "FormulirPendaftaran_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
