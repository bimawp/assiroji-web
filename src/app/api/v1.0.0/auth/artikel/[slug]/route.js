import { NextResponse } from 'next/server';
import { handleDeleteArtikel, handleGetArtikelBySlug, handleUpdateArtikel } from '../services.js';
import { createClient } from '@supabase/supabase-js';
import { bucket } from '@/lib/prisma/index.js';
import { getRecordByColumn } from '@/service/index.js';
import { jwtAuthToken } from '@/lib/jwt/index.js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET(req, context) {
  const { params } = context;
  const slug = params?.slug;
  if (!slug) {
    return new Response('Slug not provided', { status: 400 });
  }

  try {
    if (params.slug) {
      const artikel = await handleGetArtikelBySlug(params.slug);

      return NextResponse.json(artikel, { status: 200 });
    }
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req, context) {
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }
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

    const id = formData.get('id');
    const headerImage = formData.get('headerImage');
    const title = formData.get('title');
    const content = formData.get('content');
    const category = formData.get('category');
    const getSlug = formData.get('slug');
    const tags = formData.getAll('tags');
    const description = formData.get('description');
    const authorId = formData.get('authorId');
    if (!slug) {
      throw new Error('Article ID is required for update.');
    }

    let publicUrl = formData.get('currentHeaderImage');
    const updateData = {};

    if (headerImage instanceof Blob && headerImage?.name) {
      const { headerImage: relativePath } = await handleGetArtikelBySlug(slug);
      const oldDataImage = relativePath.split(`${bucket}/`)[1];

      if (oldDataImage) {
        const { data: deleteOldData, error: errorDeleteOldData } = await supabase.storage
          .from(bucket)
          .remove([oldDataImage]);

        if (errorDeleteOldData) {
          throw new Error(`Error uploading image: ${errorDeleteOldData.message}`);
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
          .upload(filePath, headerImage, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }

        const { data: publicUrlData, error: publicUrlError } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        if (publicUrlError) {
          throw new Error(`Error getting public URL: ${publicUrlError.message}`);
        }

        publicUrl = publicUrlData.publicUrl;
      }
    }
    if (headerImage instanceof Blob) updateData.headerImage = publicUrl;
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (description) updateData.description = description;
    if (getSlug) updateData.slug = getSlug;
    if (tags && tags.length > 0) updateData.tags = tags;
    const updatedArtikel = await handleUpdateArtikel(slug, updateData);

    return NextResponse.json(updatedArtikel, { status: 200 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, context) {
  try {
    const { slug } = context.params;

    if (!slug) {
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
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const { headerImage: relativePath } = await getRecordByColumn('Artikel', 'slug', slug);

    if (!relativePath) {
      return NextResponse.json({ error: 'data tidak ada' }, { status: 400 });
    }
    const oldDataImage = relativePath.split(`${bucket}/`)[1];

    const { data: deleteOldData, error: errorDeleteOldData } = await supabaseAuth.storage
      .from(bucket)
      .remove([oldDataImage]);
    if (errorDeleteOldData) {
      throw new Error(`Error uploading image: ${errorDeleteOldData.message}`);
    }

    await handleDeleteArtikel(slug);
    return NextResponse.json({ message: 'Artikel deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
