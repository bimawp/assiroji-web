import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req) {
  try {
    const prestasiArticles = await prisma.artikel.findMany({
      where: {
        category: 'Prestasi',
      },
    });
    if (!prestasiArticles) {
      return NextResponse.json({ message: 'No open prestasiArticles found' }, { status: 404 });
    }
    return NextResponse.json(prestasiArticles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
