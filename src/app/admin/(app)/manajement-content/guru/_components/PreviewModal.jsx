'use client';
import React from 'react';
import Image from 'next/image';

export default function PreviewModal({ isOpen, onClose, gurus }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-screen max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">Preview</h2>
        </div>
        <div className="p-4">
          <div className="bg-[#40E0D0] min-h-screen p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gurus.map((guru) => (
                <div
                  key={guru['id-guru']}
                  className="bg-[#7FFFD4] rounded-lg p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-32 h-32 bg-white rounded-full overflow-hidden mb-4">
                    {guru.urlImage ? (
                      <Image
                        src={guru.urlImage}
                        alt={guru.nama}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{guru.nama}</h3>
                  <p className="text-gray-600">{guru.jabatan}</p>
                </div>
              ))}
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
