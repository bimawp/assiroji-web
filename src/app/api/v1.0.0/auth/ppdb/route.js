import { bucket, prisma, supabaseAnonKey, supabaseUrl, verifyToken } from '@/lib/prisma';
import { createRecord } from '@/service';
import { createClient } from '@supabase/supabase-js';
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
export async function POST(req) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const isValidToken = await verifyToken(token);

  if (!isValidToken) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

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
  }
}

// export async function PUT(req) {
//   const authHeader = req.headers.get('Authorization');

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
//   }

//   const token = authHeader.split(' ')[1];
//   const isValidToken = await verifyToken(token);

//   if (!isValidToken) {
//     return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
//   }

//   const supabase = createClient(supabaseUrl, supabaseAnonKey);

//   try {
//     const formData = await req.formData();
//     const id = formData.get('id');
//     const namaPPDB = formData.get('namaPPDB');
//     const tahunAjaran = formData.get('tahunAjaran');
//     const status = formData.get('status');
//     const biayaPendaftaran = parseFloat(formData.get('biayaPendaftaran'));
//     const biayaBulanan = parseFloat(formData.get('biayaBulanan'));
//     const biayaSeragam = parseFloat(formData.get('biayaSeragam'));
//     const jumlahKuota = formData.get('jumlahKuota')
//       ? parseInt(formData.get('jumlahKuota'), 10)
//       : null;
//     const brosur = formData.getAll('brosur');
//     const noWa = formData.get('noWa');
//     const noRekBRI = formData.get('noRekBRI');

//     if (!id) {
//       throw new Error('ID is required for updating.');
//     }

//     const { data, error } = await supabase
//       .from('ppdb')
//       .update({
//         namaPPDB,
//         tahunAjaran,
//         status,
//         biayaPendaftaran,
//         biayaBulanan,
//         biayaSeragam,
//         jumlahKuota,
//         brosur,
//         noWa,
//         noRekBRI,
//       })
//       .eq('id', id);

//     if (error) {
//       throw new Error(`Error updating data: ${error.message}`);
//     }

//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (error) {
//     console.error('Error:', error.message);
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const dataPPDB = await prisma.pPDB.create({
//       data: body,
//     });

//     return NextResponse.json(
//       {
//         dataPPDB,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error creating PPDB:', error);
//     return NextResponse.json({ error: 'Error creating PPDB' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export async function PUT(request) {
//   try {
//     const url = new URL(request.url);
//     const id = url.searchParams.get('id');

//     if (!id) {
//       return NextResponse.json({ error: 'PPDB ID is required' }, { status: 400 });
//     }

//     const body = await request.json();
//     const updatedPPDB = await prisma.pPDB.update({
//       where: { id: parseInt(id) },
//       data: body,
//     });

//     console.log('Updated PPDB:', updatedPPDB);

//     return NextResponse.json(
//       {
//         updatedPPDB,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error updating PPDB:', error);
//     if (error.code === 'P2025') {
//       return NextResponse.json({ error: 'PPDB not found' }, { status: 404 });
//     }
//     return NextResponse.json({ error: 'Error updating PPDB' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
