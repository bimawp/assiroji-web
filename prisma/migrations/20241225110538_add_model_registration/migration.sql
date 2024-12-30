-- CreateTable
CREATE TABLE "RiwayatDaftar" (
    "id_riwayat_daftar" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "tanggalPendaftaran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "keterangan" TEXT,

    CONSTRAINT "RiwayatDaftar_pkey" PRIMARY KEY ("id_riwayat_daftar")
);

-- CreateTable
CREATE TABLE "DataDaftar" (
    "id_data_daftar" TEXT NOT NULL,
    "idRiwayat" TEXT NOT NULL,
    "namaPaket" TEXT NOT NULL,
    "biaya" DOUBLE PRECISION NOT NULL,
    "statusPembayaran" TEXT NOT NULL,
    "metodePembayaran" TEXT NOT NULL,

    CONSTRAINT "DataDaftar_pkey" PRIMARY KEY ("id_data_daftar")
);

-- CreateTable
CREATE TABLE "Form" (
    "id_form" TEXT NOT NULL,
    "idRiwayat" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT NOT NULL,
    "noTelepon" TEXT NOT NULL,
    "namaAyah" TEXT,
    "namaIbu" TEXT,
    "pekerjaanAyah" TEXT,
    "pekerjaanIbu" TEXT,
    "penghasilan" DOUBLE PRECISION,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id_form")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataDaftar_idRiwayat_key" ON "DataDaftar"("idRiwayat");

-- CreateIndex
CREATE UNIQUE INDEX "Form_idRiwayat_key" ON "Form"("idRiwayat");

-- CreateIndex
CREATE UNIQUE INDEX "Form_nik_key" ON "Form"("nik");

-- AddForeignKey
ALTER TABLE "RiwayatDaftar" ADD CONSTRAINT "RiwayatDaftar_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataDaftar" ADD CONSTRAINT "DataDaftar_idRiwayat_fkey" FOREIGN KEY ("idRiwayat") REFERENCES "RiwayatDaftar"("id_riwayat_daftar") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_idRiwayat_fkey" FOREIGN KEY ("idRiwayat") REFERENCES "RiwayatDaftar"("id_riwayat_daftar") ON DELETE RESTRICT ON UPDATE CASCADE;
