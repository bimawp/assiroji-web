import { NextResponse } from 'next/server';
import {
  handleCreateUser,
  handleGetAllUsers,
} from './services';

export async function GET(req) {
  try {
    const users = await handleGetAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const user = await handleCreateUser(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
