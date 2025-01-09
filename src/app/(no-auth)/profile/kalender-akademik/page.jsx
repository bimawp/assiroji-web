import React from 'react';
import MyCalendar from './_components';

export default async function Page() {
  try {
    const ress = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/v1.0.0/auth/kalender', {
      cache: 'no-store',
    });
    if (!ress) {
      notFound();
    }
    const data = await ress.json();

    return <MyCalendar data={data} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
