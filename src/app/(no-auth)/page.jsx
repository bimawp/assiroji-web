import React from 'react';
import HomePage from './_components/Index';

export default async function Page() {
  try {
    const ress = await fetch('http://localhost:3000/api/landingpage/home');
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
