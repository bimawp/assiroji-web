/*
  Warnings:

  - A unique constraint covering the columns `[id_user]` on the table `FormulirPendaftaran` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FormulirPendaftaran_id_user_key" ON "FormulirPendaftaran"("id_user");
