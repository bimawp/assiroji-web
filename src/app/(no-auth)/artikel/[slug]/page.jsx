import React from 'react';
import ArticleDetailPage from './_components/Dashboard';
import { handleGetArtikelBySlug } from '@/app/api/v1.0.0/auth/artikel/services';

export default async function Page({ params }) {
  const { slug } = params;

  try {
    const artikel = await handleGetArtikelBySlug(slug);

    if (!artikel) {
      notFound();
    }

    return <ArticleDetailPage data={artikel} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
