import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const ppdb = await prisma.pPDB.findUnique({
      where: { id_ppdb: params.id },
    });
    if (!ppdb) {
      return NextResponse.json({ error: 'PPDB not found' }, { status: 404 });
    }
    return NextResponse.json(ppdb);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching PPDB' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    console.log('body', body);

    const updatedPPDB = await prisma.pPDB.update({
      where: { id_ppdb: params.id },
      data: body,
    });
    return NextResponse.json(updatedPPDB);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating PPDB' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.pPDB.delete({
      where: { id_ppdb: params.id },
    });
    return NextResponse.json({ message: 'PPDB deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting PPDB' }, { status: 500 });
  }
}
