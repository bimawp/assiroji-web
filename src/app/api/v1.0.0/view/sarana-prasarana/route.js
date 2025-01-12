import { prisma } from '@/lib/prisma';
import { getAllRecords } from '@/service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sarana = await getAllRecords('Sarana');
    const prasarana = await getAllRecords('Prasarana');
    if (!sarana || !sarana) {
      return NextResponse.json({ message: 'No open sarana-prasarana found' }, { status: 404 });
    }

    const data = { sarana, prasarana };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
