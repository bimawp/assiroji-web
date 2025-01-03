import { prisma } from '@/lib/prisma';
import { getAllRecords, getRecordById } from '@/service';
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
    const { id_user, id_ppdb, formData, jenisPendaftaran, jenjang } = body;

    console.log('body', body);

    const dataPendaftar = await prisma.dataPendaftar.create({
      data: {
        id_user: id_user,
        id_ppdb: id_ppdb,
        statusPendaftaran: 'proses',
        jenisPendaftaran,
        jenjang,
      },
    });
    console.log(jenisPendaftaran === 'ulang');

    if (jenisPendaftaran === 'ulang') {
      const existingFormulir = await getRecordById('formulirPendaftaran', {
        id_user,
      });
      console.log('tst', existingFormulir);
      if (existingFormulir) {
        const updatedFormulir = await prisma.formulirPendaftaran.update({
          where: {
            id_formulir_pendaftar: existingFormulir.id_formulir_pendaftar,
          },
          data: {
            ...formData,
          },
        });

        return NextResponse.json(
          {
            dataPendaftar,
            formulirPendaftaran: updatedFormulir,
          },
          { status: 201 }
        );
      } else {
        const newFormulir = await prisma.formulirPendaftaran.create({
          data: {
            ...formData,
            id_user,
          },
        });

        return NextResponse.json(
          {
            dataPendaftar,
            formulirPendaftaran: newFormulir,
          },
          { status: 201 }
        );
      }
    }

    const newFormulir = await prisma.formulirPendaftaran.create({
      data: {
        ...formData,
        id_user,
      },
    });

    return NextResponse.json(
      {
        dataPendaftar,
        formulirPendaftaran: newFormulir,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error processing registration', details: error.message },
      { status: 500 }
    );
  }
}
