import { jwtAuthToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { getAllRecords, getRecordById } from '@/service';
import { NextResponse } from 'next/server';
export async function GET(req) {
  // const tokenValidation = await jwtAuthToken(req);

  // if (tokenValidation.error) {
  //   return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  // }
  try {
    const latestPpdb = await prisma.pPDB.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        status: 'dibuka',
      },
    });

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
  // const tokenValidation = await jwtAuthToken(request);

  // if (tokenValidation.error) {
  //   return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  // }
  try {
    const body = await request.json();

    console.log('body : ', body);
    const { id_user, id_ppdb, formData, jenisPendaftaran, jenjang } = body;

    const dataPendaftar = await prisma.dataPendaftar.create({
      data: {
        id_user: id_user,
        id_ppdb: id_ppdb,
        statusPendaftaran: 'proses',
        jenisPendaftaran
      },
    });

    if (jenisPendaftaran === 'ulang') {
      const existingFormulir = await getRecordById('formulirPendaftaran', {
        id_user,
      });

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
  } finally {
    await prisma.$disconnect();
  }
}
