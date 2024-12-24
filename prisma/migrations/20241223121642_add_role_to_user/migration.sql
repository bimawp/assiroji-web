/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Artikel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Artikel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('peserta', 'admin');

-- AlterTable
ALTER TABLE "Artikel" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'peserta';

-- CreateIndex
CREATE UNIQUE INDEX "Artikel_slug_key" ON "Artikel"("slug");
