import React from 'react';
import GuruKaryawanPage from './_components';
export const revalidate = 3600;
export default async function Page() {
  try {
    const ress = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/v1.0.0/view/guru-dan-karyawan'
    );
    if (!ress) {
      notFound();
    }
    const data = await ress.json();
    return <GuruKaryawanPage guru={data} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
