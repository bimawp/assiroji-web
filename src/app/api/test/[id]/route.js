import articles from './../articles.json';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;

  const article = articles.find((item) => item['id-artikel'] === id);

  if (!article) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json(article);
}
