import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { handleGetArtikelBySlug } from '../../../auth/artikel/services';

export async function GET(req, context) {
  try {
    const { slug } = await context.params;
    if (!slug) {
      return new Response('Slug not provided', { status: 400 });
    }

    if (slug) {
      const artikel = await handleGetArtikelBySlug(slug);

      return NextResponse.json(artikel, { status: 200 });
    }
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
