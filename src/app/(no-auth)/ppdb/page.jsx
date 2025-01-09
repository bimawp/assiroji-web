import React from 'react';

import PpdbPage from './_components';
import PPDBBelumDibuka from './_components/notFound';

export default async function Page() {
  try {
    const ress = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/v1.0.0/auth/ppdb', {
      cache: 'no-store',
    });
    if (!ress) {
      notFound();
    }
    const data = await ress.json();
    if (data?.error) {
      return <PPDBBelumDibuka data={data} />;
    }
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
