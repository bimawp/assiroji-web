import React from 'react';
import ArticlePage from './_components/Dashboard';
import { handleGetAllArtikels } from '@/app/api/v1.0.0/auth/artikel/services';

export default async function Page() {
  try {
    const artikels = await handleGetAllArtikels();

    return <ArticlePage data={artikels} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
