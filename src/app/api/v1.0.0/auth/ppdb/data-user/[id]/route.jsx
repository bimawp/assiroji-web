import { prisma } from '@/lib/prisma';
import { getRecordById } from '@/service';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const dataUser = await getRecordById('formulirPendaftar', { id_user: id });

    console.log('Formulir Pendaftaran:', dataUser);

    return NextResponse.json(dataUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
