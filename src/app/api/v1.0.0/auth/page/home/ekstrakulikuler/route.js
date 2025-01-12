import { jwtAuthToken } from '@/lib/jwt';
import { bucket, prisma, supabaseAnonKey, supabaseUrl, verifyToken } from '@/lib/prisma';
import { getAllRecords } from '@/service';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const ekstrakurikulers = await getAllRecords('Ekstrakurikuler');
    return NextResponse.json(ekstrakurikulers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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

    const title = formData.get('title');
    const description = formData.get('description');
    const file = formData.get('itemImage');
    const isActive = formData.get('isActive');

    if (!file || !file.name) {
      throw new Error('Header image is required and must have a valid name.');
    }
    if (!title || !description || !file) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    const date = new Date();
    const folderPath = `ekstrakurikuler/${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}`;
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `${folderPath}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Failed to upload file: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

    const itemImage = publicUrlData.publicUrl;
    'asdf', { title, itemImage, description, isActive };
    await prisma['Ekstrakurikuler'].create({
      data: { title, itemImage, description },
    });
    return NextResponse.json(itemImage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
