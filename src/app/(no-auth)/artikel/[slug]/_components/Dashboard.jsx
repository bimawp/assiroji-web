'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: 'The Future of AI in Healthcare',
    description:
      'Exploring how artificial intelligence is revolutionizing the healthcare industry with predictive analytics and personalized treatment plans.',
    categories: ['Technology', 'Health'],
    image: "/image/KEGIATAN DO'A BERSAMA.jpeg",
    author: 'Dr. Jane Smith',
    date: 'May 15, 2023',
    content: `
      <p>Artificial Intelligence (AI) is poised to revolutionize the healthcare industry, promising to improve patient outcomes, reduce costs, and enhance the overall quality of care. From predictive analytics to personalized treatment plans, AI is already making significant inroads in various aspects of healthcare.</p>
      
      <h2>Predictive Analytics</h2>
      <p>One of the most promising applications of AI in healthcare is predictive analytics. By analyzing vast amounts of patient data, AI algorithms can identify patterns and predict potential health issues before they become serious. This proactive approach to healthcare can lead to earlier interventions, potentially saving lives and reducing the burden on healthcare systems.</p>
      
      <h2>Personalized Treatment Plans</h2>
      <p>AI is also enabling the development of highly personalized treatment plans. By considering a patient's genetic makeup, lifestyle factors, and medical history, AI can help doctors tailor treatments to individual patients, increasing the likelihood of positive outcomes.</p>
      
      <h2>Challenges and Ethical Considerations</h2>
      <p>While the potential benefits of AI in healthcare are enormous, there are also significant challenges and ethical considerations to address. These include ensuring patient privacy, addressing potential biases in AI algorithms, and maintaining the human touch in healthcare.</p>
      
      <h2>Conclusion</h2>
      <p>As AI continues to evolve, its impact on healthcare will only grow. By embracing these technologies responsibly, we can look forward to a future where healthcare is more efficient, effective, and personalized than ever before.</p>
    `,
  },
  {
    id: 2,
    title: 'Breakthrough in Quantum Computing',
    description:
      'Scientists achieve a major milestone in quantum computing, bringing us closer to solving complex problems at unprecedented speeds.',
    categories: ['Technology', 'Science'],
    image: "/image/KEGIATAN DO'A BERSAMA.jpeg",
    author: 'Prof. Alan Quantum',
    date: 'June 2, 2023',
    content: `
      <p>In a groundbreaking development, scientists have achieved a major milestone in quantum computing, bringing us one step closer to solving complex problems at unprecedented speeds. This breakthrough promises to revolutionize fields ranging from cryptography to drug discovery.</p>

      <h2>The Quantum Leap</h2>
      <p>Quantum computers leverage the principles of quantum mechanics to perform calculations that would be practically impossible for classical computers. The recent breakthrough involves the successful manipulation of a record number of qubits, the fundamental units of quantum information.</p>

      <h2>Potential Applications</h2>
      <p>The implications of this advancement are far-reaching. Quantum computers could potentially:</p>
      <ul>
        <li>Accelerate drug discovery by simulating complex molecular interactions</li>
        <li>Optimize financial models and risk assessment</li>
        <li>Enhance machine learning algorithms</li>
        <li>Solve complex optimization problems in logistics and supply chain management</li>
      </ul>

      <h2>Challenges Ahead</h2>
      <p>Despite this exciting progress, significant challenges remain. Quantum systems are notoriously fragile and prone to errors. Researchers are working tirelessly to develop error-correction techniques and improve the stability of quantum systems.</p>

      <h2>The Road Ahead</h2>
      <p>As we stand on the brink of the quantum computing era, it's clear that this technology has the potential to transform our world in ways we're only beginning to imagine. The race is now on to develop practical, scalable quantum computers that can deliver on the promise of this revolutionary technology.</p>
    `,
  },
];

export default function ArticleDetailPage({ data: article }) {
  if (!article) {
    return <div className="container mx-auto p-4">Article not found</div>;
  }
  console.log(article);

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
              <span className="text-gray-500">
                {article.createdAt.toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
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
