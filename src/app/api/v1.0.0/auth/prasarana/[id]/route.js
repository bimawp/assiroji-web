import { supabase, verifyToken } from '@/lib/prisma';
import { deleteRecord, getRecordById, updateRecord } from '@/service';
import { NextResponse } from 'next/server';

export async function GET(req, context) {
  try {
    const { id } = context.params;
    console.log(id);
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const data = await getRecordById('Prasarana', { id_prasarana: id });
    console.log('data', data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const authHeader = req.headers.get('Authorization');
    console.log('authHeader', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const isValidToken = await verifyToken(token);
    console.log('adfasd', isValidToken);
    if (!isValidToken) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get('name');
    const quantity = formData.get('quantity');
    const condition = formData.get('condition');

    const updates = {};
    if (name) updates.name = name;
    if (quantity) updates.quantity = Number(quantity);
    if (condition) updates.condition = Number(condition);

    console.log('uodate', updates);
    const newData = await updateRecord('Prasarana', { id_prasarana: id }, updates);

    console.log('data', newData);

    return NextResponse.json({ message: 'Updated successfully', newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const authHeader = req.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const isValidToken = await verifyToken(token);

    if (!isValidToken) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    await deleteRecord('Prasarana', { id_prasarana: id });

    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
