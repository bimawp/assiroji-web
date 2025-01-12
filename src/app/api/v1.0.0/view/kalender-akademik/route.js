import { prisma } from '@/lib/prisma';
import { getAllRecords } from '@/service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const kalenderData = await getAllRecords('kalender');

    if (!kalenderData) {
      return NextResponse.json({ message: 'No open PPDB found' }, { status: 404 });
    }

    return NextResponse.json(kalenderData);
  } catch (error) {
    console.error('Error fetching latest PPDB:', error);
    return NextResponse.json({ error: 'Error fetching latest PPDB' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
