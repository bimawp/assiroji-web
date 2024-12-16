'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = ['All', 'Technology', 'Science', 'Health', 'Business', 'Entertainment'];

const articles = [
  {
    id: 1,
    title: 'The Future of AI in Healthcare',
    description:
      'Exploring how artificial intelligence is revolutionizing the healthcare industry with predictive analytics and personalized treatment plans.',
    categories: ['Technology', 'Health'],
    image: "/image/KEGIATAN DO'A BERSAMA.jpeg",
  },
  {
    id: 2,
    title: 'Breakthrough in Quantum Computing',
    description:
      'Scientists achieve a major milestone in quantum computing, bringing us closer to solving complex problems at unprecedented speeds.',
    categories: ['Technology', 'Science'],
    image: "/image/KEGIATAN DO'A BERSAMA.jpeg",
  },
  {
    id: 3,
    title: 'The Rise of Sustainable Business Practices',
    description:
      'How companies are adopting eco-friendly strategies to reduce their carbon footprint and appeal to environmentally conscious consumers.',
    categories: ['Business', 'Science'],
    image: "/image/KEGIATAN DO'A BERSAMA.jpeg",
  },
  {
    id: 4,
    title: 'Advancements in Gene Therapy',
    description:
      'Recent breakthroughs in gene therapy offer hope for treating previously incurable genetic disorders.',
    categories: ['Health', 'Science'],
    image: "/image/KEGIATAN DO'A BERSAMA.jpeg",
  },
  {
    id: 5,
    title: 'The Impact of Social Media on Mental Health',
    description:
      'Examining the double-edged sword of social media and its effects on mental well-being in the digital age.',
    categories: ['Health', 'Technology'],
    image: "/image/KEGIATAN DO'A BERSAMA.jpeg",
  },
  {
    id: 6,
    title: 'Innovations in Renewable Energy',
    description:
      'Exploring the latest technologies in solar, wind, and other renewable energy sources that are shaping a sustainable future.',
    categories: ['Science', 'Technology'],
    image: "/image/KEGIATAN DO'A BERSAMA.jpeg",
  },
  {
    id: 7,
    title: 'The Evolution of E-commerce',
    description:
      'How online shopping has transformed the retail landscape and what the future holds for digital commerce.',
    categories: ['Business', 'Technology'],
    image: "/image/KEGIATAN DO'A BERSAMA.jpeg",
  },
];

export default function ArticlePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = articles.filter(
    (article) =>
      (selectedCategory === 'All' || article.categories.includes(selectedCategory)) &&
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-[#40E0D0]">
      <div>
        <div className="relative w-full h-48 md:h-[600px] rounded-lg overflow-hidden">
          <Image src="/image/rumah.png" alt="Madrasah Building" fill className="object-cover" />
        </div>
        <div className="flex flex-col items-center text-center space-y-4 -mt-10 z-10 relative">
          <Image
            src="/image/logo.png"
            alt="MA AS-SIROJI Logo"
            width={120}
            height={120}
            className="rounded-full"
          />
          <h1 className="text-4xl font-bold mb-8">ARTIKEL</h1>
        </div>
      </div>

      <div className="container mx-auto p-4 ">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search articles..."
            className="flex-grow p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded ${
                  selectedCategory === category
                    ? 'bg-[#ffc107] text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Newly Created Article */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Latest Article</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <Image
                src={articles[0].image}
                alt={articles[0].title}
                width={300}
                height={200}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2">{articles[0].title}</h3>
                <p className="text-gray-600 mb-4">{articles[0].description}</p>
                <div className="flex gap-2">
                  {articles[0].categories.map((category) => (
                    <span
                      key={category}
                      className="bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50">
            <button className="bg-[#ffc107] hover:bg-[#ffc107] text-white font-bold py-2 px-4 rounded">
              Read More
            </button>
          </div>
        </div>

        {/* Article List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:p-6 rounded-lg">
          {filteredArticles.slice(1).map((article) => (
            <div className="bg-[#039685] rounded-xl text-white w-full h-full" key={article.id}>
              <div className="relative p-4 ">
                <Image
                  src="/image/KEGIATAN STUDY TOUR.jpg"
                  alt="heh"
                  width={500}
                  height={300}
                  className="w-full object-cover rounded-xl"
                />
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-medium leading-tight ">{article.title}</h2>
                <div className="flex items-center justify-between border-t py-2">
                  <time dateTime={'24 Agustus 2024'} className="text-sm">
                    24 Agustus 2024
                  </time>
                  <Link
                    href={`/artikel/${article.id}`}
                    className="rounded-full bg-gradient-to-tr from-emerald-900 to-emerald-400  p-2"
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
