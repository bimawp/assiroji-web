import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const latestPpdb = await prisma.pPDB.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        status: 'dibuka',
      },
    });
    console.log(latestPpdb);

    if (!latestPpdb) {
      return NextResponse.json({ message: 'No open PPDB found' }, { status: 404 });
    }

    return NextResponse.json(latestPpdb);
  } catch (error) {
    console.error('Error fetching latest PPDB:', error);
    return NextResponse.json({ error: 'Error fetching latest PPDB' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const dataPPDB = await prisma.pPDB.create({
      data: body,
    });
    console.log(body);

    return NextResponse.json(
      {
        dataPPDB,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating PPDB:', error);
    return NextResponse.json({ error: 'Error creating PPDB' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'PPDB ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const updatedPPDB = await prisma.pPDB.update({
      where: { id: parseInt(id) },
      data: body,
    });

    console.log('Updated PPDB:', updatedPPDB);

    return NextResponse.json(
      {
        updatedPPDB,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating PPDB:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'PPDB not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error updating PPDB' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
