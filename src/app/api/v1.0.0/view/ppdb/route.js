import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const ppdbWithJumlahDaftar = await prisma.pPDB.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        status: 'dibuka',
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
        dataPendaftar: {
          select: {
            id_data_pendaftar: true,
            jenisPendaftaran: true,
            statusPendaftaran: true,
          },
        },
      },
    });

    if (!ppdbWithJumlahDaftar) {
      return NextResponse.json({ message: 'PPDB belum dibuka', error: true }, { status: 200 });
    }
    const totalPendaftar = ppdbWithJumlahDaftar?.dataPendaftar.filter(
      (pendaftar) => pendaftar.jenisPendaftaran === 'baru'
    ).length;

    const belumDiKonfirmasi = ppdbWithJumlahDaftar?.dataPendaftar.filter(
      (pendaftar) => pendaftar.statusPendaftaran !== 'konfirmasi'
    ).length;
    const sudahDiKonfirmasi = ppdbWithJumlahDaftar?.dataPendaftar.filter(
      (pendaftar) => pendaftar.statusPendaftaran === 'konfirmasi'
    ).length;

    const ppdbWithJumlahDaftarProcessed = {
      ...ppdbWithJumlahDaftar,
      totalPendaftar,
      belumDiKonfirmasi,
      sudahDiKonfirmasi,
    };

    delete ppdbWithJumlahDaftarProcessed.dataPendaftar;

    return NextResponse.json(ppdbWithJumlahDaftarProcessed);
  } catch (error) {
    console.error('PPDB:', error);
    return NextResponse.json({ error: 'PPDB belum di buka' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
