import { jwtAuthToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

import { NextResponse } from 'next/server';

export async function GET(request) {
  const tokenValidation = await jwtAuthToken(request);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    // const ppdbData = await prisma.pPDB.findMany({
    //   where: {
    //     status: 'ditutup',
    //   },
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // });
    const ppdbWithJumlahDaftar = await prisma.pPDB.findMany({
      where: {
        status: 'ditutup',
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id_ppdb: true,
        namaPPDB: true,
        tahunAjaran: true,
        status: true,
        biayaPendaftaran: true,
        biayaBulanan: true,
        biayaSeragam: true,
        jumlahKuota: true,
        brosur: true,
        noWa: true,
        noRekBRI: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            dataPendaftar: true,
          },
        },
      },
    });

    const ppdbData = ppdbWithJumlahDaftar.map((ppdb) => ({
      ...ppdb,
      jumlahDaftar: ppdb._count.dataPendaftar,
    }));

    if (!ppdbData) {
      return NextResponse.json({ message: 'No open PPDB found' }, { status: 404 });
    }
    return NextResponse.json(ppdbData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
