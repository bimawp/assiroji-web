import { prisma } from '@/lib/prisma';
import { getAllRecords } from '@/service';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { slug } = await params;
  try {
    const artikel = await handleGetArtikelBySlug(slug);
    if (!artikel) {
      return NextResponse.json({ message: 'No open ARTIKEL found' }, { status: 404 });
    }

    return NextResponse.json(artikel);
  } catch (error) {
    console.error('Error fetching latest PPDB:', error);
    return NextResponse.json({ error: 'Error fetching latest PPDB' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
