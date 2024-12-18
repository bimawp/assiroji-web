import articles from './articles.json';

export function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');

  let filteredArticles = articles;
  if (category) {
    filteredArticles = filteredArticles.filter(article => article.category.toLowerCase() === category.toLowerCase());
  }

  if (tag) {
    filteredArticles = filteredArticles.filter(article => article.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  }

  return new Response(JSON.stringify(filteredArticles), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}
