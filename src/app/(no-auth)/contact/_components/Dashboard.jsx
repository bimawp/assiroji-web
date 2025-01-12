'use client';

import Header from '@/components/__Header';
import Image from 'next/image';
import { useState } from 'react';

export default function ContactPage({ data }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gradient-to-b from-teal-200 to-teal-400 p-4 md:p-0 text-black">
      <Header
        h1Content="Hubungi Kami"
        subtitle="Kami Siap Melayani dan Menjawab Pertanyaan Anda"
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

      {/* content */}
      <div className="max-w-4xl mx-auto space-y-6 pb-20 mt-10">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="order-2 md:order-1">
            <h3 className="text-lg font-semibold mb-4">Kirim Pesan Kepada Kami</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full transition-colors"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          <div className="order-1 md:order-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden">
              <Image
                src="/image/ma-assiroji.jpg"
                alt="MA AS-SIROJI Building"
                className="w-full h-48 md:h-64 object-cover"
                width={500}
                height={300}
              />
              <div className="p-4">
                <h4 className="font-semibold mb-2">Informasi Kontak</h4>
                <div className="space-y-2">
                  {/* {contactItems.map((item) => ( */}
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span className="font-medium">Telepon:</span>
                    <span>{data.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✉️</span>
                    <span className="font-medium">Email:</span>
                    <span>{data.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span className="font-medium">Alamat:</span>
                    <span>{data.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕒</span>
                    <span className="font-medium">Waktu kerja:</span>
                    <span>08:00-15:00 | senin-jumat</span>
                  </div>
                  {/* ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold p-4">Lokasi Kami</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.104459310235!2d107.69518699999999!3d-7.1138921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68bfbf1b4a8a5b%3A0xbf2bf58ae2834420!2sSMP%20As-SIROJI!5e0!3m2!1sid!2sid!4v1736670880015!5m2!1sid!2sid"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* end */}
    </div>
  );
}
