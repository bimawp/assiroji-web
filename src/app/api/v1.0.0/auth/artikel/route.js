import { NextResponse } from 'next/server';
import { handleGetAllArtikels, handleCreateArtikel } from './services.js';
import { createClient } from '@supabase/supabase-js';
import { bucket, supabaseAnonKey, supabaseUrl } from '@/lib/prisma/index.js';
import { jwtAuthToken } from '@/lib/jwt/index.js';

export async function GET(req) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const artikels = await handleGetAllArtikels();
    return NextResponse.json(artikels, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
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
    const headerImage = formData.get('headerImage');
    const title = formData.get('title');
    const content = formData.get('content');
    const category = formData.get('category');
    const slug = formData.get('slug');
    const description = formData.get('description');
    const tags = formData.getAll('tags');
    const authorId = formData.get('authorId');

    if (!headerImage || !headerImage.name) {
      throw new Error('Header image is required and must have a valid name.');
    }
    if (!title || !content) {
      throw new Error('Title and content are required.');
    }

    const date = new Date();
    const folderPath = `artikel/${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
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

    const publicUrl = publicUrlData.publicUrl;

    const ress = await handleCreateArtikel({
      headerImage: publicUrl,
      title,
      content,
      description,
      category,
      slug,
      tags,
      authorId,
    });

    return NextResponse.json(ress || { article: publicUrl }, { status: 201 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
