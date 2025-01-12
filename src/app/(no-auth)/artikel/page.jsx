import React from 'react';
import ArticlePage from './_components/Dashboard';

export default async function Page() {
  try {
    const ress = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/v1.0.0/view/artikel');
    if (!ress) {
      notFound();
    }
    const { artikels, categories } = await ress.json();
    return <ArticlePage data={artikels} categories={categories} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
