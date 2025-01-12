import { jwtAuthToken } from '@/lib/jwt';
import { bucket, supabase, supabaseAnonKey, supabaseUrl, verifyToken } from '@/lib/prisma';
import { deleteRecord, getRecordByColumn, updateRecord } from '@/service';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(req, context) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('Gallery')
      .select('*')
      .eq('id_gallery', id)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, context) {
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

    const formData = await req.formData();
    const updates = {};

    const fields = [
      'instagram',
      'facebook',
      'whatsApp',
      'tiktok',
      'youtube',
      'address',
      'email',
      'phone',
    ];

    fields.forEach((field) => {
      const value = formData.get(field);
      if (value !== null && value !== undefined) {
        updates[field] = value.toString();
      }
    });

    const newData = await updateRecord('Contact', { id_contact: id }, updates);

    return NextResponse.json(
      { message: 'Social media links updated successfully', newData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
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

    const existingRecord = await getRecordByColumn('Contact', 'id_contact', id);
    if (!existingRecord) {
      return NextResponse.json({ error: 'Contact record not found' }, { status: 404 });
    }

    await deleteRecord('Contact', { id_contact: id });

    return NextResponse.json({ message: 'Contact record deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
