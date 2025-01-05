-- CreateTable
CREATE TABLE "Kurikulum" (
    "id_kurikulum" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kurikulum_pkey" PRIMARY KEY ("id_kurikulum")
);

-- CreateTable
CREATE TABLE "Kalender" (
    "id_tgl_kalender" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kalender_pkey" PRIMARY KEY ("id_tgl_kalender")
);
