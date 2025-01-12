'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import Header from '@/components/__Header';

export default function ArticlePage({ data, categories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = data.filter(
    (article) =>
      (selectedCategory === 'All' || article.category.includes(selectedCategory)) &&
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const newestData = data.reduce((latest, current) =>
    new Date(current.createdAt).getTime() > new Date(latest.createdAt).getTime() ? current : latest
  );

  return (
    <div className="bg-gradient-to-b from-teal-200 to-teal-400 min-h-screen">
      <Header
        h1Content="Artikel"
        subtitle="Wawasan, Prestasi, dan Kegiatan Terkini MA AS-SIROJI"
        backgroundImage="/image/rumah.png"
      />
      <div className="flex flex-col items-center text-center space-y-4 -mt-10 z-10 relative">
        <Image
          src="/image/logo.png"
          alt="MA AS-SIROJI Logo"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>

      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full p-3 pr-10 border-2 border-teal-500 rounded-full bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-teal-500 text-white'
                    : 'bg-white/80 text-teal-800 hover:bg-teal-100'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden mb-8 transition-transform ">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-teal-800">Latest Article</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <Image
                src={newestData.headerImage}
                alt={newestData.title}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full md:w-1/3 h-64 md:h-auto"
              />
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2 text-teal-700">{newestData.title}</h3>
                <p className="text-gray-600 mb-4">{newestData.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {newestData.tags.map((category) => (
                    <span
                      key={category}
                      className="bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/artikel/${newestData.slug}`}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              className="bg-[#039685] rounded-xl text-white w-full h-full shadow-lg "
              key={article.slug}
            >
              <div className="relative p-4">
                <Image
                  src={article.headerImage}
                  alt={article.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-medium leading-tight">{article.title}</h2>
                <div className="flex items-center justify-between border-t border-teal-400 py-2">
                  <time
                    dateTime={article?.createdAt}
                    className="text-sm"
                  >
                    {article?.createdAt}
                  </time>
                  <Link
                    href={`/artikel/${article.slug}`}
                    className="rounded-full bg-gradient-to-tr from-emerald-900 to-emerald-400 p-2 transition-transform hover:scale-110"
                  >
                    <ArrowRight className="text-xl font-bold -rotate-45" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
