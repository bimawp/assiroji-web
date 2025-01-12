import React from 'react';
import ArticleDetailPage from './_components/Dashboard';

export default async function Page({ params }) {
  const { slug } = params;

  try {
    const ress = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/view/artikel/' + slug);
    if (!ress) {
      notFound();
    }
    const data = await ress.json();

    return <ArticleDetailPage data={data} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
