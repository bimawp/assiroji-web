import { NextResponse } from 'next/server';
import { handleDeleteUser, handleGetUser, handleUpdateUser } from '../services';
import { jwtAuthToken } from '@/lib/jwt';

export async function GET(req, { params }) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  try {
    if (id) {
      const user = await handleGetUser(id);

      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedUser = await handleUpdateUser(id, body);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: `The email is already taken, please choose another one.` },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || 'Something went wrong while updating the record.' },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await handleDeleteUser(id);
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
