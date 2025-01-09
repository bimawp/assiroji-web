-- CreateTable
CREATE TABLE "Profile" (
    "id_profile" TEXT NOT NULL,
    "namaYayasan" TEXT NOT NULL,
    "namaMadrasah" TEXT NOT NULL,
    "nomorStatistik" TEXT NOT NULL,
    "npsn" TEXT NOT NULL,
    "akreditasi" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "rt" TEXT NOT NULL,
    "rw" TEXT NOT NULL,
    "desa" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "noTelp" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "namaKepala" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id_profile")
);

-- CreateTable
CREATE TABLE "SiswaTahunan" (
    "id_siswaTahunan" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "jumlahSiswa" INTEGER NOT NULL,
    "id_profile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiswaTahunan_pkey" PRIMARY KEY ("id_siswaTahunan")
);

-- AddForeignKey
ALTER TABLE "SiswaTahunan" ADD CONSTRAINT "SiswaTahunan_id_profile_fkey" FOREIGN KEY ("id_profile") REFERENCES "Profile"("id_profile") ON DELETE RESTRICT ON UPDATE CASCADE;
