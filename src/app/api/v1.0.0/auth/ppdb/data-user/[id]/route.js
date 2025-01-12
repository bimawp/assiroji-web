import { prisma } from '@/lib/prisma';
import { getRecordById } from '@/service';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const dataUser = await getRecordById('formulirPendaftar', { id_user: id });

    return NextResponse.json(dataUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
