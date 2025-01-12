import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const profiles = await prisma.profile.findFirst({
      include: { siswaTahunan: true },
    });
    if (!profiles) {
      return NextResponse.json({ message: 'No open profiles found' }, { status: 404 });
    }
    return NextResponse.json(profiles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
