import { prisma } from '@/lib/prisma';
import { deleteRecord, getRecordById } from '@/service';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { id_kalender: id_tgl_kalender } = params;

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
  }
}

export async function PUT(req, { params }) {
  try {
    const { id_kalender: id_tgl_kalender } = params;

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
  }
}

export async function DELETE(req, { params }) {
  const { id_kalender: id_tgl_kalender } = params;

  if (!id_tgl_kalender) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  try {
    await deleteRecord('Kalender', { id_tgl_kalender });
    return NextResponse.json({ message: 'Date deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
