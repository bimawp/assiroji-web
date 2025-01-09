import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ModalViewArtikel = ({ open, handleOpen, className, data }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (data.headerImage instanceof File) {
      const objectUrl = URL.createObjectURL(data.headerImage);
      setImageSrc(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof data.headerImage === 'string') {
      setImageSrc(data.headerImage);
    }
  }, [data.headerImage]);
  return (
    <div
      className={`fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`relative m-4 max-w-3xl w-full rounded-lg bg-white p-6 text-blue-gray-500 shadow-2xl transition-transform duration-300 ${className} ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } overflow-y-auto max-h-[90vh]`}
      >
        <h2 className="text-2xl font-semibold mb-4">{data.title}</h2>

        <div className="mb-6">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={data.title}
              width={800}
              height={400}
              className="w-full h-[200px] object-cover rounded-lg"
            />
          )}
        </div>

        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">
            {data.category}
          </span>
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: data.content }} />

        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="text-gray-700 border border-gray-300 hover:bg-gray-100 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
            onClick={handleOpen}
          >
            Close
          </button>
          <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalViewArtikel;
