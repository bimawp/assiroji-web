'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Berita({ data }) {
  return (
    <Swiper
      spaceBetween={1}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      breakpoints={{
        // Untuk perangkat mobile
        0: {
          slidesPerView: 1,
        },
        // Untuk perangkat tablet
        640: {
          slidesPerView: 2,
        },
        // Untuk perangkat PC
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index} className='p-5'>
          <div className="w-full mb-30 py-12 pb-20">
            <div className="bg-[#039685] rounded-xl text-white w-full h-full">
              <div className="relative p-4">
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src={item.headerImage}
                    alt="Responsive Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-medium leading-tight ">{item.title}</h2>
                <div className="flex items-center justify-between border-t py-2">
                  <time dateTime={'24 Agustus 2024'} className="text-sm">
                    24 Agustus 2024
                  </time>
                  <Link
                    href=" #"
                    className="rounded-full bg-gradient-to-tr from-emerald-900 to-emerald-400  p-2"
                  >
                    <ArrowRight className="text-xl font-bold -rotate-45" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
