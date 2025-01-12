import { prisma } from '@/lib/prisma';
import { getAllRecords } from '@/service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const guru = await getAllRecords('Guru');

    if (!guru) {
      return NextResponse.json({ message: 'No open guru found' }, { status: 404 });
    }

    return NextResponse.json(guru);
  } catch (error) {
    console.error('Error fetching latest PPDB:', error);
    return NextResponse.json({ error: 'Error fetching latest PPDB' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
