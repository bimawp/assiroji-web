import Image from 'next/image';
import React from 'react';

export default function SarananaCard({ data }) {
  return (
    <>
      <Image src={data.itemImage} className="m-auto" width={200} height={200} alt="image" />
      <p className="text-center py-2 text-sm">{data.name}</p>
    </>
  );
}
