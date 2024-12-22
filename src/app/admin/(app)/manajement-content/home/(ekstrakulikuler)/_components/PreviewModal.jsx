'use client';
import React from 'react';
import { Eye } from 'lucide-react';
import Image from 'next/image';

export default function PreviewModal({ isOpen, onClose, activities }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg  w-screen max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">Preview</h2>
        </div>
        <div className="p-4">
          <div className="p-4 md:py-10 w-full lg:px-14">
            <div className="rounded-md bg-[#039685] text-white shadow-xl w-full p-6">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">EKSTRAKULIKULER</h2>
              <hr className="bg-white w-full rounded-md h-1 mb-3 md:mb-0" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-3 lg:p-10">
                {activities
                  .filter((activity) => activity.isActive)
                  .map((activity) => (
                    <div key={activity.id} className="bg-white rounded-md w-full">
                      <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-4 border-b-2 border-[#1D564F] pb-3">
                            <h1 className="md:text-3xl font-bold text-[#1D564F]">
                              {activity.name}
                            </h1>
                            <div className="bg-[#B4D5D0] p-4 rounded-full">
                              <Eye className="w-6 h-6 text-[#1D564F]" />
                            </div>
                          </div>
                          <div className="relative h-[200px] md:h-[240px] rounded-2xl overflow-hidden">
                            <Image
                              src={activity.imageUrl}
                              alt={activity.name}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform hover:scale-105 duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
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
