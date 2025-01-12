import { jwtAuthToken } from '@/lib/jwt';
import { prisma, supabase, verifyToken } from '@/lib/prisma';
import { deleteRecord, getRecordById, updateRecord } from '@/service';
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
    const data = await getRecordById('Prasarana', { id_prasarana: id });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
    const { id } = context.params;

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
    const name = formData.get('name');
    const quantity = formData.get('quantity');
    const condition = formData.get('condition');

    const updates = {};
    if (name) updates.name = name;
    if (quantity) updates.quantity = Number(quantity);
    if (condition) updates.condition = Number(condition);

    const newData = await updateRecord('Prasarana', { id_prasarana: id }, updates);

    return NextResponse.json({ message: 'Updated successfully', newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
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

    await deleteRecord('Prasarana', { id_prasarana: id });

    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
