-- CreateEnum
CREATE TYPE "Role" AS ENUM ('peserta', 'admin');

-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'peserta',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Artikel" (
    "id_artikel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "headerImage" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Artikel_pkey" PRIMARY KEY ("id_artikel")
);

-- CreateTable
CREATE TABLE "Page" (
    "id_page" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id_page")
);

-- CreateTable
CREATE TABLE "Section" (
    "id_section" SERIAL NOT NULL,
    "pageId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "galleryId" TEXT,
    "contactId" TEXT,
    "ekstrakurikulerId" TEXT,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id_section")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id_gallery" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "itemImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id_gallery")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id_contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id_contact")
);

-- CreateTable
CREATE TABLE "Ekstrakurikuler" (
    "id_ekstrakurikuler" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "itemImage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ekstrakurikuler_pkey" PRIMARY KEY ("id_ekstrakurikuler")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Artikel_slug_key" ON "Artikel"("slug");

-- AddForeignKey
ALTER TABLE "Artikel" ADD CONSTRAINT "Artikel_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id_page") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id_gallery") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id_contact") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_ekstrakurikulerId_fkey" FOREIGN KEY ("ekstrakurikulerId") REFERENCES "Ekstrakurikuler"("id_ekstrakurikuler") ON DELETE SET NULL ON UPDATE CASCADE;
