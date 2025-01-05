import { createRecord, deleteAllRecords, getAllRecords, updateRecord } from '@/service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ekstrakurikulers = await getAllRecords('Kurikulum');
    return NextResponse.json(ekstrakurikulers[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const dataKurikulum = await createRecord('Kurikulum', body);
    return NextResponse.json(
      {
        dataKurikulum,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating PPDB:', error);
    return NextResponse.json({ error: 'Error creating PPDB' }, { status: 500 });
  }
}
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id_kurikulum, ...dataToUpdate } = body;

    if (!id_kurikulum) {
      return NextResponse.json({ error: 'ID is required for updating a record' }, { status: 400 });
    }

    const updatedRecord = await updateRecord('Kurikulum', { id_kurikulum }, dataToUpdate);

    return NextResponse.json(
      {
        message: 'Record updated successfully',
        updatedRecord,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating record:', error);
    return NextResponse.json({ error: 'Error updating record' }, { status: 500 });
  }
}
export async function DELETE() {
  try {
    const result = await deleteAllRecords('Kurikulum');
    return NextResponse.json({ message: 'All rows deleted successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error deleting rows:', error);
    return NextResponse.json({ error: 'Error deleting rows' }, { status: 500 });
  }
}
