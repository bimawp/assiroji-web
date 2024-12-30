import React from 'react';
import HomePage from './_components/Index';
export const dynamic = 'force-dynamic';
export default async function Page() {
  try {
    const ress = await fetch('/api/landingpage/home', { cache: 'no-store' });
    if (!ress) {
      notFound();
    }
    const data = await ress.json();
    return <HomePage data={data} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
