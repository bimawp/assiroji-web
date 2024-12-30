import React from 'react';
import ArticlePage from './_components/Dashboard';
import { handleGetAllArtikels } from '@/app/api/v1.0.0/auth/artikel/services';

export default async function Page() {
  try {
    const artikels = await handleGetAllArtikels();
    const categories = Array.from(new Set(artikels.map((item) => item.category)));
    if (!categories.includes('All')) {
      categories.unshift('All');
    }
    console.log('category : ', categories);
    if (!artikels) {
      notFound();
    }

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
