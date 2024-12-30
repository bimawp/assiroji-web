import { prisma } from '@/lib/prisma';
import { getRecordById } from '@/service';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { id_user } = await params;

    if (!id_user) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const ppdbWithPendaftar = await prisma.pPDB.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        status: 'dibuka',
      },
      include: {
        dataPendaftar: {
          where: {
            id_user: id_user,
          },
        },
      },
    });
    const dataUser = await getRecordById('formulirPendaftaran', { id_user });
    const status = ppdbWithPendaftar.dataPendaftar[0]?.statusPendaftaran || null;
    const tanggalPendaftaran = ppdbWithPendaftar.dataPendaftar[0]?.tanggalPendaftaran || null;
    const jenisPendaftaran = ppdbWithPendaftar.dataPendaftar[0]?.jenisPendaftaran || null;
    const jenjang = ppdbWithPendaftar.dataPendaftar[0]?.jenjang || null;

    const updatedPpdb = {
      ...ppdbWithPendaftar,
      status,
      tanggalPendaftaran,
      jenisPendaftaran,
      jenjang,
      dataUser,
    };

    delete updatedPpdb.dataPendaftar;
    return NextResponse.json(updatedPpdb, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
