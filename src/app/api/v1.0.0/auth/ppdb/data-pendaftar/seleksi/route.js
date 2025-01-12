import { jwtAuthToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const tokenValidation = await jwtAuthToken(request);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const latestPpdb = await prisma.pPDB.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        status: 'dibuka',
      },
    });

    const dataPendaftar = await prisma.dataPendaftar.findMany({
      where: {
        id_ppdb: latestPpdb.id_ppdb,
        statusPendaftaran: {
          not: 'konfirmasi',
        },
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
      return {
        ...item,
        user: {
          ...item.user,
          formulirPendaftaran: formulir,
        },
      };
    });

    if (!latestPpdb) {
      return NextResponse.json({ message: 'No open PPDB found' }, { status: 404 });
    }

    return NextResponse.json({
      latestPpdb: latestPpdb.tahunAjaran,
      dataPendaftar: dataPendaftarFormatted,
    });
  } catch (error) {
    console.error('Error fetching latest PPDB:', error);
    return NextResponse.json({ error: 'Error fetching latest PPDB' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
