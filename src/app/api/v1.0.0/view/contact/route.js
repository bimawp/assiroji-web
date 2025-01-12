import { prisma } from '@/lib/prisma';
import { getAllRecords } from '@/service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const contacts = await getAllRecords('Contact');
    if (!contacts) {
      return NextResponse.json({ message: 'No open contacts found' }, { status: 404 });
    }
    const data = await contacts[0];
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
