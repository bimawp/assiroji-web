'use client';
import React from 'react';
import Image from 'next/image';

export default function ModalViewPrestasi({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-screen max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">Preview Sarana</h2>
        </div>
        <div className="max-w-4xl mx-auto py-5">
          <div className="space-y-6">
            {data.map((achievement) => (
              <div
                key={achievement['id-artikel']}
                className="bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <Image
                        src={achievement.headerImage}
                        alt={achievement.title}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-full md:w-2/3 space-y-3">
                      <h2 className="text-xl font-semibold">{achievement.title}</h2>
                      <h3 className="text-lg font-medium">{achievement.content}</h3>
                      <p className="text-sm leading-relaxed">{achievement.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <p className="text-sm leading-relaxed">
              Prestasi ini menjadi bukti nyata dari kerja keras siswa, dukungan guru, serta doa dari
              seluruh warga madrasah. Semoga keberhasilan ini menjadi motivasi untuk terus
              berprestasi dan membawa nama baik madrasah ke tingkat yang lebih tinggi.
            </p>
            <p className="text-sm mt-4">
              Terima kasih atas doa dan dukungan semua pihak. Mari kita terus berjuang bersama untuk
              menggapai prestasi di masa depan!
            </p>
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
