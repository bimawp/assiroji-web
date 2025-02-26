import React from 'react';
import { ArrowRightCircle, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Berita from './BeritaCard';
import EkstrakulikulerCard from './EkstrakulikulerCard';
import GalleryCard from './GalleryCard';
import SocialMediaCard from './SocialMediaCard';
import ContactCard from './ContactCard';

export default function HomePage({ data }) {
  return (
    <div className="">
      <div className="w-full">
        <div className="relative z-10 w-full h-[90vh]">
          <Image
            src="/image/rumah.png"
            width={1500}
            height={1500}
            alt="madrasah aliyah as-siroji"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.3]" />
          <div className="absolute px-4 md:px-20 w-full h-full z-20 left-0 top-0 flex flex-col justify-center">
            <h1 className="font-bold text-4xl md:text-5xl drop-shadow-lg text-white leading-tight">
              Terwujudnya Madrasah Sebagai Lembaga <br /> Pendidikan Yang Islami Dan Unggul
            </h1>
            <Link
              href="/profile/visi-misi"
              className="bg-[#F7B118] text-white w-56 py-4 flex items-center gap-4 justify-center mt-10 hover:bg-white hover:text-black transition-all"
            >
              <ArrowRightCircle />
              Visi dan Misi
            </Link>
          </div>
          <div className="w-full bg-[#039786] py-3 pl-4 md:pl-20 absolute z-20 bottom-0 flex items-center gap-4">
            <Image
              src="/image/whatsapp.png"
              width={50}
              height={50}
              alt="madrasah aliyah as-siroji"
              className=""
            />
            <p className="text-white">
              Informasi & Pendaftaran Siswa Baru <br />
              Tahun Ajaran 2025/2026
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 md:py-10 w-full lg:px-14">
        <div className="rounded-md bg-[#f4f4f4] shadow-xl w-full flex flex-col md:flex-row">
          <div className="md:w-[93%] px-2 md:px-10">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1D564F] mt-10 mb-4 text-center ">
              BERITA
            </h2>
            <hr className="bg-[#1D564F] w-full h-1" />
            <div className=" w-full">
              <Berita data={data['artikel']} />
            </div>
          </div>
          <Link
            href={'/artikel'}
            className="bg-[#F7B118] text-black flex flex-col py-3 lg:py-0 justify-center rounded-md"
          >
            <p className="md:-rotate-90 text-center"> Berita Lainnya</p>
          </Link>
        </div>
      </div>
      <div className="p-4 md:py-10 w-full lg:px-14">
        <div className="rounded-md bg-[#039685] text-white shadow-xl w-full p-6">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center ">EKSTRAKULIKULER</h2>
          <hr className="bg-white w-full rounded-md h-1 mb-3 md:mb-0 " />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-3 lg:p-10">
            {data['ekstrakurikulers'].map((item, index) => (
              <div key={index} className="bg-white rounded-md w-full">
                <EkstrakulikulerCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-4xl font-bold  pb-5 text-center ">GALERY</h2>
        <hr className="bg-[#1D564F] mb-4 w-full rounded-md h-1" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data['gallery'].map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <GalleryCard image={image} />
            </div>
          ))}
        </div>
      </div>

      <div className=" bg-[#e0f2f1] p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-2">
          <div>
            <div className="h-[300px] md:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.104459310235!2d107.69518699999999!3d-7.1138921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68bfbf1b4a8a5b%3A0xbf2bf58ae2834420!2sSMP%20As-SIROJI!5e0!3m2!1sid!2sid!4v1736670880015!5m2!1sid!2sid"
                className="w-full h-full rounded-lg border-md"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#009688] text-white rounded-lg">
              <div className="p-4">
                <div className="text-2xl md:text-4xl font-bold text-[#ffc107]">Contact Us</div>
              </div>
            </div>

            <div className="bg-[#009688] text-white rounded-lg">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#ffc107] mb-4">LOCATION</h2>
                <p className="text-lg">
                  JL.Toblong Rt 01 Rw 02
                  <br />
                  Ds. Mekar Jaya Kec. Pacet Kab.
                  <br />
                  Bandung
                </p>
              </div>
            </div>

            <div className="bg-[#009688] text-white rounded-lg">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#ffc107] mb-4">CONTACT</h2>
                <ContactCard data={data.contact} />
              </div>
            </div>

            <SocialMediaCard data={data.contact} />
          </div>
        </div>
      </div>
    </div>
  );
}
