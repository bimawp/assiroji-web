import { NextResponse } from 'next/server';
import { handleCreateUser, handleGetAllUsers } from './services';
import { jwtAuthToken } from '@/lib/jwt';

export async function GET(req) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const users = await handleGetAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  // const tokenValidation = await jwtAuthToken(req);

  // if (tokenValidation.error) {
  //   return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  // }
  try {
    const body = await req.json();
    const kalender = await await handleCreateUser(body);
    return NextResponse.json(kalender, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
