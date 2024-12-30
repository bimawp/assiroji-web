import Image from 'next/image';
import React from 'react';

function GalleryCard({ image }) {
  return (
    <>
      <Image
        src={image.itemImage}
        alt={image.description}
        width={600}
        height={400}
        className="w-full h-[300px] object-cover transition-transform hover:scale-105 duration-300"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-sm font-medium">{image.description}</p>
      </div>
    </>
  );
}

export default GalleryCard;
