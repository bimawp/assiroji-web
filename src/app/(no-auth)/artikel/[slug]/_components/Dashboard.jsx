'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatTanggalArtikel } from '@/lib/date';

export default function ArticleDetailPage({ data: article }) {
  if (!article) {
    return <div className="container mx-auto p-4">Article not found</div>;
  }

  return (
    <div className="bg-gradient-to-b from-teal-200 to-teal-400 min-h-screen">
      <div className="container mx-auto p-4 ">
        <Link href="/artikel" className="text-blue-500 hover:underline mb-4 inline-block">
          &larr; Back to Articles
        </Link>
        <article className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src={article.headerImage}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-[400px] object-cover"
          />
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">admin</h1>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Image
                  src="/image/logo.png"
                  alt="admin"
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <span className="text-gray-600">admin</span>
              </div>
              <span className="text-gray-500">{formatTanggalArtikel(article.createdAt)}</span>
            </div>
            <div className="flex gap-2 mb-6">
              {article.tags.map((category) => (
                <span
                  key={category}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {category}
                </span>
              ))}
            </div>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
