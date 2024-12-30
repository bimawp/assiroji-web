/*
  Warnings:

  - Added the required column `facebook` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tiktok` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsApp` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `youtube` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "facebook" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "tiktok" TEXT NOT NULL,
ADD COLUMN     "whatsApp" TEXT NOT NULL,
ADD COLUMN     "youtube" TEXT NOT NULL;
