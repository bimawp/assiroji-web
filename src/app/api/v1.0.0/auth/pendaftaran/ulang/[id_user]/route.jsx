import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, context) {
  try {
    const { id_user } = context.params;

    if (!id_user) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const formulir = await prisma.formulirPendaftaran.findMany({
      where: {
        dataPendaftar: {
          user: {
            id_user: id_user,
          },
        },
      },
      include: {
        dataPendaftar: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    delete formulir[0].id_data_pendaftar;
    delete formulir[0].dataPendaftar;

    console.log('Formulir Pendaftaran:', formulir[0]);

    // const status = ppdbWithPendaftar.dataPendaftar[0]?.statusPendaftaran || null;

    // const updatedPpdb = {
    //   ...ppdbWithPendaftar,
    //   status,
    // };

    delete updatedPpdb.dataPendaftar;
    return NextResponse.json(formulir[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
