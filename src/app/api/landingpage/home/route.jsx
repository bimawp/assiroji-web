import { getAllRecords } from '@/service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ekstrakurikulers = await getAllRecords('Ekstrakurikuler');
    const gallery = await getAllRecords('Gallery');
    const artikel = await getAllRecords('Artikel');
    const contact = await getAllRecords('Contact');
    const sortedArtikel = artikel.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const latestTenData = sortedArtikel.slice(0, 7);
    const data = {
      gallery,
      ekstrakurikulers: ekstrakurikulers,
      artikel: latestTenData,
      contact: contact[0],
    };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
