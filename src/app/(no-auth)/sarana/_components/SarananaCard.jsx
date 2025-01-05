import Image from 'next/image';
import React from 'react';

export default function SaranaCard({ data }) {
  return (
    <div className="relative group h-[200px] m-auto rounded-lg overflow-hidden">
      <Image
        src={data.itemImage}
        className="m-auto transition-transform duration-300 group-hover:scale-105"
        width={200}
        height={200}
        alt="image"
      />

      <p className="text-center py-2 text-sm">{data.name}</p>

      <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-sm">Volume: {data.volume}</p>
        <p className="text-sm">Quantity: {data.quantity}</p>
        <p className="text-sm">Condition: {data.condition}</p>
      </div>
    </div>
  );
}
