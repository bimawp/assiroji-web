import { NextResponse } from 'next/server';
import { handleDeleteUser, handleGetUser, handleUpdateUser } from '../services';

export async function GET(req, { params }) {
  try {
    if (params.id) {
      const user = await handleGetUser(params.id);
      console.log('user id', user);
      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  if (!params.id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedUser = await handleUpdateUser(params.id, body);
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
  if (!params.id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await handleDeleteUser(params.id);
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
