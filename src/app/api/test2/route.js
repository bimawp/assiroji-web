import guru from './guru.json';

export function GET(request) {
  const { searchParams } = new URL(request.url);
  const nama = searchParams.get('nama');

  let filteredGuru = guru;
  if (nama) {
    filteredGuru = filteredGuru.filter(
      (article) => article.nama.toLowerCase() === nama.toLowerCase()
    );
  }

  return new Response(JSON.stringify(filteredGuru), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}
