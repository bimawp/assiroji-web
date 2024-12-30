'use client';
import React from 'react';
import Image from 'next/image';

export default function PreviewModal({ isOpen, onClose, prasarana }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-screen max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">Preview Prasarana</h2>
        </div>
        <div className="p-4">
          <div className="bg-[#40E0D0] min-h-screen p-8">
            <h1 className="text-3xl font-bold text-center mb-8">PRASARANA</h1>

            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Data Ruangan</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">No</th>
                      <th className="px-4 py-2 text-left">Nama Bangunan</th>
                      <th className="px-4 py-2 text-center">Jml</th>

                      <th className="px-4 py-2 text-center">Kondisi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prasarana.map((item, index) => (
                      <tr key={item['id-bangunan']} className="border-b">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2 text-center">{item.quantity}</td>

                        <td className="px-4 py-2 text-center">{item.condition}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
