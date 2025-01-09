import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id: id_ppdb } = await params;
    const latestPpdb = await prisma.pPDB.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        id_ppdb,
      },
    });
    if (!latestPpdb) {
      return NextResponse.json({ message: 'No open PPDB found' }, { status: 404 });
    }
    const dataPendaftar = await prisma.dataPendaftar.findMany({
      where: {
        id_ppdb: latestPpdb.id_ppdb,
      },
      select: {
        id_data_pendaftar: true,
        id_ppdb: true,
        id_user: true,
        statusPendaftaran: true,
        tanggalPendaftaran: true,
        jenisPendaftaran: true,
        jenjang: true,
        user: {
          select: {
            formulirPendaftaran: {
              select: {
                namaLengkap: true,
                jenisKelamin: true,
                tempatTanggalLahir: true,
                asalSekolah: true,
                namaIbu: true,
                pendidikanTerakhirIbu: true,
                pekerjaanIbu: true,
                namaAyah: true,
                pendidikanTerakhirAyah: true,
                pekerjaanAyah: true,
                alamatLengkap: true,
                noTelepon: true,
              },
            },
          },
        },
      },
    });
    const dataPendaftarFormatted = dataPendaftar.map((item) => {
      const formulir = item.user.formulirPendaftaran[0] || null;
      delete item.user;
      return {
        ...item,
        user: { ...item.user, ...formulir },
        // user: {
        //   ...item.user,
        // },
      };
    });

    return NextResponse.json({
      dataPPDB: latestPpdb,
      dataPendaftar: dataPendaftarFormatted,
    });
  } catch (error) {
    console.error('Error fetching latest PPDB:', error);
    return NextResponse.json({ error: 'Error fetching latest PPDB' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
