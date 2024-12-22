import guru from './../guru.json';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;

  const article = guru.find((item) => item['id-guru'] === id);

  if (!article) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json(article);
}
