import { getToken } from 'next-auth/jwt';

export const getCctv = async () => {
  try {
    const response = await fetch('https://api.garutkab.go.id/api/cctv');

    if (!response.ok) {
      return new Response('Failed to fetch data', { status: response.status });
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response('CCTV not found', { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
