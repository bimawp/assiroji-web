import { prisma } from '@/lib/prisma';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ppdbData = await prisma.pPDB.findMany({
      where: {
        status: 'ditutup',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!ppdbData) {
      return NextResponse.json({ message: 'No open PPDB found' }, { status: 404 });
    }
    return NextResponse.json(ppdbData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
