import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function EkstrakulikulerCard({ data }) {
  return (
    <>
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4  border-b-2 border-[#1D564F] pb-3">
            <h1 className="md:text-3xl font-bold text-[#1D564F]">{data.title}</h1>
            <div className="bg-[#B4D5D0] p-4 rounded-full">
              <ArrowUpRight className="w-6 h-6 text-[#1D564F]" />
            </div>
          </div>
          <div className="relative h-[200px] md:h-[240px] rounded-2xl overflow-hidden">
            <Image
              src={data.itemImage}
              alt="Group of scouts posing outdoors with camping tents in background"
              fill
              className="object-cover transition-transform hover:scale-105 duration-300"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EkstrakulikulerCard;
