import { NextResponse } from 'next/server';
import {
  handleGetAllArtikels,
  handleCreateArtikel,
  handleDeleteArtikel,
  handleGetArtikel,
  handleUpdateArtikel,
} from './services.js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function verifyToken(token) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return false;
  }
  return true;
}

export async function GET(req) {
  try {
    const artikels = await handleGetAllArtikels();
    return NextResponse.json(artikels, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
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
    const headerImage = formData.get('headerImage');
    const title = formData.get('title');
    const content = formData.get('content');
    const category = formData.get('category');
    const slug = formData.get('slug');
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
      .from('artikel-bucket')
      .upload(filePath, headerImage);

    if (uploadError) {
      throw new Error(`Error uploading image: ${uploadError.message}`);
    }

    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from('artikel-bucket')
      .getPublicUrl(filePath);

    if (publicUrlError) {
      throw new Error(`Error getting public URL: ${publicUrlError.message}`);
    }

    const publicUrl = publicUrlData.publicUrl;

    const ress = await handleCreateArtikel({
      headerImage: publicUrl,
      title,
      content,
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
