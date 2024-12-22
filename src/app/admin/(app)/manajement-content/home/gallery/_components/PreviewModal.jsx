'use client';
import React from 'react';
import GalleryCard from '@/app/(no-auth)/_components/GalleryCard';

export default function PreviewModal({ isOpen, onClose, galleries }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg  w-screen max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">Preview</h2>
        </div>
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-2xl md:text-4xl font-bold  pb-5 text-center ">GALERY</h2>
          <hr className="bg-[#1D564F] mb-4 w-full rounded-md h-1" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galleries
              .filter((activity) => activity.isActive)
              .map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg">
                  <GalleryCard image={image} />
                </div>
              ))}
          </div>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
