import { prisma } from '@/lib/prisma';
import { getAllRecords } from '@/service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const Kurikulum = await getAllRecords('Kurikulum');

    if (!Kurikulum) {
      return NextResponse.json({ message: 'No open kurikulum found' }, { status: 404 });
    }

    return NextResponse.json(Kurikulum[0]);
  } catch (error) {
    console.error('Error fetching latest PPDB:', error);
    return NextResponse.json({ error: 'Error fetching latest PPDB' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
