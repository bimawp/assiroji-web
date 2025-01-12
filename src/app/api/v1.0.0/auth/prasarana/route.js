import { jwtAuthToken } from '@/lib/jwt';
import { bucket, prisma, supabaseAnonKey, supabaseUrl, verifyToken } from '@/lib/prisma';
import { getAllRecords } from '@/service';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const tokenValidation = await jwtAuthToken(request);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const ekstrakurikulers = await getAllRecords('Prasarana');
    return NextResponse.json(ekstrakurikulers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }

  try {
    const formData = await req.formData();

    const name = formData.get('name');
    const quantity = formData.get('quantity');
    const condition = formData.get('condition');

    if (!name || !condition || !quantity) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const oke = await prisma['Prasarana'].create({
      data: { name, quantity: Number(quantity), condition: Number(condition) },
    });

    return NextResponse.json(oke, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
