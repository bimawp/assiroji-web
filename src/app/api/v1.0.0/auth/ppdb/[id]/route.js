import { jwtAuthToken } from '@/lib/jwt';
import { bucket, prisma, supabaseAnonKey, supabaseUrl } from '@/lib/prisma';
import { updateRecord } from '@/service';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const tokenValidation = await jwtAuthToken(request);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const { id } = await params;
    const ppdb = await prisma.pPDB.findUnique({
      where: { id_ppdb: id },
    });
    if (!ppdb) {
      return NextResponse.json({ error: 'PPDB not found' }, { status: 404 });
    }
    return NextResponse.json(ppdb);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching PPDB' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req, context) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const tokenValidation = await jwtAuthToken(req);

    if (tokenValidation.error) {
      return NextResponse.json(
        { error: tokenValidation.error },
        { status: tokenValidation.status }
      );
    }

    const { token } = tokenValidation;

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const formData = await req.formData();
    const updates = {};

    const headerImage = formData.get('brosur');
    if (headerImage && headerImage.name) {
      const date = new Date();
      const folderPath = `ppdb/${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}`;
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

      updates.brosur = publicUrlData.publicUrl;
    }

    const fields = [
      'namaPPDB',
      'tahunAjaran',
      'status',
      'biayaPendaftaran',
      'biayaBulanan',
      'biayaSeragam',
      'jumlahKuota',
      'noWa',
      'noRekBRI',
    ];

    fields.forEach((field) => {
      const value = formData.get(field);
      if (value !== null && value !== undefined) {
        if (field === 'biayaPendaftaran' || field === 'biayaBulanan' || field === 'biayaSeragam') {
          updates[field] = parseFloat(value);
        } else if (field === 'jumlahKuota') {
          updates[field] = parseInt(value, 10);
        } else {
          updates[field] = value;
        }
      }
    });

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    const newData = await updateRecord('pPDB', { id_ppdb: id }, updates);

    return NextResponse.json({ message: 'Updated successfully', newData }, { status: 200 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
