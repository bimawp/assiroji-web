import React from 'react';
import { getAllRecords } from '@/service';
import SaranaDanPrasaranaPage from './_components';

export default async function Page() {
  try {
    const sarana = await getAllRecords('Sarana');
    const prasarana = await getAllRecords('Prasarana');
    if (!sarana && !prasarana) {
      notFound();
    }

    const data = {
      sarana,
      prasarana,
    };
    console.log(data);

    return <SaranaDanPrasaranaPage data={data} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
