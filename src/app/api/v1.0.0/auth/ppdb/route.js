import { jwtAuthToken } from '@/lib/jwt';
import { bucket, prisma, supabaseAnonKey, supabaseUrl } from '@/lib/prisma';
import { createRecord } from '@/service';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(req) {
  // const tokenValidation = await jwtAuthToken(req);

  // if (tokenValidation.error) {
  //   return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  // }

  try {
    // const latestPpdb = await prisma.pPDB.findFirst({
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    //   where: {
    //     status: 'dibuka',
    //   },
    // });

    // if (!latestPpdb) {
    //   return NextResponse.json({ message: 'No open PPDB found' }, { status: 404 });
    // }
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

    console.log('ppdbWithJumlahDaftar : ', ppdbWithJumlahDaftar);
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
export async function POST(req) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }

  const { token } = tokenValidation;
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  try {
    const formData = await req.formData();
    const headerImage = formData.get('brosur');
    const namaPPDB = formData.get('namaPPDB');
    const tahunAjaran = formData.get('tahunAjaran');
    const status = formData.get('status');
    const biayaPendaftaran = parseFloat(formData.get('biayaPendaftaran'));
    const biayaBulanan = parseFloat(formData.get('biayaBulanan'));
    const biayaSeragam = parseFloat(formData.get('biayaSeragam'));
    const jumlahKuota = formData.get('jumlahKuota')
      ? parseInt(formData.get('jumlahKuota'), 10)
      : null;

    const noWa = formData.get('noWa');
    const noRekBRI = formData.get('noRekBRI');

    if (!headerImage || !headerImage.name) {
      throw new Error('Header image is required and must have a valid name.');
    }
    if (
      !namaPPDB ||
      !tahunAjaran ||
      !status ||
      !biayaPendaftaran ||
      !biayaBulanan ||
      !biayaSeragam ||
      !jumlahKuota ||
      !noWa ||
      !noRekBRI
    ) {
      throw new Error('Atribute are required.');
    }

    const date = new Date();
    const folderPath = `ppdb/${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const fileName = `${Date.now()}_${headerImage.name}`;
    const filePath = `${folderPath}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, headerImage);

    if (uploadError) {
      throw new Error(`Error uploading image: ${uploadError.message}`);
    }

    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    if (publicUrlError) {
      throw new Error(`Error getting public URL: ${publicUrlError.message}`);
    }

    const publicUrl = publicUrlData.publicUrl;
    const sendData = {
      brosur: publicUrl,
      namaPPDB,
      tahunAjaran,
      status,
      biayaPendaftaran,
      biayaBulanan,
      biayaSeragam,
      jumlahKuota,
      noWa,
      noRekBRI,
    };
    const ress = await createRecord('pPDB', sendData);

    return NextResponse.json(ress || { article: publicUrl }, { status: 201 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
