

export async function GET() {
  return new Response(JSON.stringify({ data: ['oke'] }), { status: 200 });
}

