import { prisma, verifyToken } from '@/lib/prisma';
import { getAllRecords } from '@/service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const contacts = await getAllRecords('Contact');
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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

  try {
    const formData = await req.formData();
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
    const contactData = {};

    fields.forEach((field) => {
      const value = formData.get(field);
      if (value && value.trim() !== '') {
        contactData[field] = value.trim();
      }
    });

    if (Object.keys(contactData).length === 0) {
      return NextResponse.json({ error: 'At least one field is required' }, { status: 400 });
    }
    const contoh = {
      instagram: ' https://www.instagram.com/example_account',
      facebook: 'https://www.facebook.com/example_page',
      whatsApp: 'https://wa.me/1234567890',
      tiktok: 'https://www.tiktok.com/@example_account',
      youtube: 'https://www.youtube.com/channel/UCexample_channel',
      address: '123 Example Street, Example City, EX 12345',
      email: 'contact@example.com',
      phone: '+1 (123) 456-7890',
    };
    // console.log(contactData);
    await prisma['Contact'].create({
      data: { ...contoh },
    });
    // console.log(newContact);

    return NextResponse.json('newContact', { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const isValidToken = await verifyToken(token);

  if (!isValidToken) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const id = formData.get('id_contact');

    if (!id) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
    }

    const fields = [
      'instagram',
      'facebook',
      'whatsapp',
      'tiktok',
      'youtube',
      'address',
      'email',
      'phone',
    ];
    const updateData = {};

    fields.forEach((field) => {
      const value = formData.get(field);
      if (value !== null && value.trim() !== '') {
        updateData[field] = value.trim();
      }
    });

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid data provided for update' }, { status: 400 });
    }

    const updatedContact = await prisma.contact.update({
      where: { id_contact: id },
      data: updateData,
    });

    return NextResponse.json(updatedContact, { status: 200 });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const isValidToken = await verifyToken(token);

  if (!isValidToken) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id_contact');

    if (!id) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
    }

    await prisma.contact.delete({
      where: { id_contact: id },
    });

    return NextResponse.json({ message: 'Contact deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
