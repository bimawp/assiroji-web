import React from 'react';

import PpdbPage from './_components';

export default async function Page() {
  try {
    const ress = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/v1.0.0/auth/ppdb');
    if (!ress) {
      notFound();
    }
    const data = await ress.json();
    return <PpdbPage data={data || {}} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
