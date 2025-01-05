import Header from '@/components/__Header';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function PagePrestasiLanding({ data }) {
  return (
    <div className="bg-gradient-to-b from-teal-200 to-teal-400 p-4 md:p-0 text-black">
      <Header
        h1Content="Prestasi"
        subtitle="Membentuk Generasi Berilmu, Berakhlak, dan Berprestasi"
        backgroundImage="/image/rumah.png"
      />
      <div className="flex flex-col items-center text-center space-y-4 -mt-10 z-10 relative">
        <Image
          src="/image/logo.png"
          alt="MA AS-SIROJI Logo"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>

      <div className="max-w-4xl mx-auto py-5">
        <div className="space-y-6">
          {data.map((achievement, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <Link href={'/artikel/' + achievement.slug} className="p-4 md:p-6 block">
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
                    <h3 className="text-lg font-medium">{achievement.description}</h3>
                    {/* <p className="text-sm leading-relaxed">
                      {achievement.createdAt.toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p> */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6">
          <p className="text-sm leading-relaxed">
            Prestasi ini menjadi bukti nyata dari kerja keras siswa, dukungan guru, serta doa dari
            seluruh warga madrasah. Semoga keberhasilan ini menjadi motivasi untuk terus berprestasi
            dan membawa nama baik madrasah ke tingkat yang lebih tinggi.
          </p>
          <p className="text-sm mt-4">
            Terima kasih atas doa dan dukungan semua pihak. Mari kita terus berjuang bersama untuk
            menggapai prestasi di masa depan!
          </p>
        </div>
      </div>
    </div>
  );
}
