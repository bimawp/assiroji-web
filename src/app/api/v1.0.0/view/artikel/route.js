import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { handleGetAllArtikels } from '../../auth/artikel/services';

export async function GET() {
  try {
    const artikels = await handleGetAllArtikels();
    if (!artikels) {
      return NextResponse.json({ message: 'No open ARTIKEL found' }, { status: 404 });
    }
    const categories = Array.from(new Set(artikels.map((item) => item.category)));

    return NextResponse.json({ artikels, categories });
  } catch (error) {
    console.error('Error fetching latest PPDB:', error);
    return NextResponse.json({ error: 'Error fetching latest PPDB' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
