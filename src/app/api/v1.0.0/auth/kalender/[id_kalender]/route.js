import { jwtAuthToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { deleteRecord, getRecordById } from '@/service';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const { id_kalender: id_tgl_kalender } = await params;

    if (!id_tgl_kalender) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const kalender = await getRecordById('kalender', { id_tgl_kalender });

    if (!kalender) {
      return NextResponse.json({ error: 'Kalender not found' }, { status: 404 });
    }

    return NextResponse.json(kalender, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req, { params }) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const { id_kalender: id_tgl_kalender } = await params;

    if (!id_tgl_kalender) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const body = await req.json();

    const updateData = await prisma.kalender.update({
      where: { id_tgl_kalender },
      data: body,
    });

    return NextResponse.json(updateData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req, { params }) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  const { id_kalender: id_tgl_kalender } = await params;

  if (!id_tgl_kalender) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  try {
    await deleteRecord('Kalender', { id_tgl_kalender });
    return NextResponse.json({ message: 'Date deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
