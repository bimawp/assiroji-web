import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtAuthToken } from '@/lib/jwt';
export async function GET(req) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const prestasiArticles = await prisma.artikel.findMany({
      where: {
        category: 'Prestasi',
      },
    });

    return NextResponse.json(prestasiArticles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
