import { bucket, prisma, supabaseAnonKey, supabaseUrl, verifyToken } from '@/lib/prisma';
import { getAllRecords } from '@/service';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ekstrakurikulers = await getAllRecords('Guru');
    return NextResponse.json(ekstrakurikulers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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

    const name = formData.get('name');
    const position = formData.get('position');
    const file = formData.get('itemImage');
    // console.log(isActive);
    console.log('file', file);
    if (!file || !file.name) {
      throw new Error('Header image is required and must have a valid name.');
    }
    if (!name || !position || !file) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    const date = new Date();
    const folderPath = `guru/${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
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
    console.log('asdf', { name, position, itemImage });
    await prisma['Guru'].create({
      data: { name, itemImage, position },
    });
    return NextResponse.json(itemImage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
