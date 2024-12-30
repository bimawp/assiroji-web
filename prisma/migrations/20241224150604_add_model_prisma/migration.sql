-- CreateTable
CREATE TABLE "Sarana" (
    "id_sarana" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "volume" VARCHAR(255) NOT NULL,
    "condition" INTEGER NOT NULL,
    "itemImage" TEXT NOT NULL,

    CONSTRAINT "Sarana_pkey" PRIMARY KEY ("id_sarana")
);
