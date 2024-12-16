import Berita from '@/component/__Berita';
import { ArrowRight, ArrowRightCircle, ArrowUpRight, DoorClosedIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Home() {
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
              href="#"
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
              <Berita />
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
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="bg-white rounded-md w-full">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4  border-b-2 border-[#1D564F] pb-3">
                      <h1 className="md:text-3xl font-bold text-[#1D564F]">PRAMUKA</h1>
                      <div className="bg-[#B4D5D0] p-4 rounded-full">
                        <ArrowUpRight className="w-6 h-6 text-[#1D564F]" />
                      </div>
                    </div>
                    <div className="relative h-[200px] md:h-[240px] rounded-2xl overflow-hidden">
                      <Image
                        src="/image/KEGIATAN DO'A BERSAMA.jpeg"
                        alt="Group of scouts posing outdoors with camping tents in background"
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-300"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-4xl font-bold  pb-5 text-center ">GALERY</h2>
        <hr className="bg-[#1D564F] mb-4 w-full rounded-md h-1" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              src: '/image/KEGIATAN STUDY TOUR.jpg',
              alt: 'School assembly in courtyard',
              caption: 'Annual School Assembly',
            },
            {
              src: '/image/KEGIATAN STUDY TOUR.jpg',
              alt: 'Graduation ceremony',
              caption: 'Graduation Ceremony 2023',
            },
            {
              src: '/image/KEGIATAN STUDY TOUR.jpg',
              alt: 'Study tour group photo',
              caption: 'Study Tour MA AS-SIROJI',
            },
            {
              src: '/image/KEGIATAN STUDY TOUR.jpg',
              alt: 'Students group photo',
              caption: 'Student Activities',
            },
          ].map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-[300px] object-cover transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" bg-[#e0f2f1] p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-2">
          {/* Map Section */}
          <div>
            <div className="h-[300px] md:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.6!2d107.7!3d-6.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDgnMDAuMCJTIDEwN8KwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1629789845!5m2!1sen!2sid"
                className="w-full h-full rounded-lg border-md"
                loading="lazy"
                allowFullScreen
              />
            </div>
            {/* <div className="bg-[#009688] text-white">
              <div className="p-4">
                <button className="w-full text-xl font-bold hover:text-[#ffc107] transition-colors">
                  Visit
                </button>
              </div>
            </div> */}
          </div>

          {/* Contact Information */}
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
                  JL.Tobiong Rt 01 Rw 02
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
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="font-bold">PHONE:</span>
                    <a href="tel:085353802722" className="hover:text-[#ffc107] transition-colors">
                      085353802722
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-bold">EMAIL:</span>
                    <a
                      href="mailto:contact@example.com"
                      className="hover:text-[#ffc107] transition-colors"
                    >
                      contact@example.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { src: '/image/facebook.png' },
                { src: '/image/instagram2.png' },
                { src: '/image/facebook.png' },
                { src: '/image/instagram2.png' },
              ].map((Icon, index) => (
                <div key={index} className="bg-[#ffc107] rounded-lg">
                  <div className="p-4 flex items-center justify-center">
                    <a
                      href="#"
                      className="text-white hover:text-[#009688] transition-colors"
                      aria-label={Icon.name}
                    >
                      <Image
                        src={Icon.src}
                        alt="media sosial"
                        width={600}
                        height={400}
                        className="w-full h-[30px] object-cover "
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
