import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function EkstrakulikulerCard({ data }) {
  return (
    <>
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4 border-b-2 border-[#1D564F] pb-3">
            <h1 className="md:text-3xl font-bold text-[#1D564F]">{data.title}</h1>
            <div className="bg-[#B4D5D0] p-4 rounded-full">
              <ArrowUpRight className="w-6 h-6 text-[#1D564F]" />
            </div>
          </div>

          <div className="relative h-[200px] md:h-[240px] rounded-2xl overflow-hidden">
            {/* Image */}
            <Image
              src={data.itemImage}
              alt={data.title}
              fill
              className="object-cover transition-transform hover:scale-105 duration-300"
              priority
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center opacity-0 transition-opacity duration-300 hover:opacity-100">
              <p className="px-4">{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EkstrakulikulerCard;
