"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function Berita() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {Array.from({ length: 2 }, (_, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-[600px]">
            <Image
              src="/image/KEGIATAN DO'A BERSAMA.jpeg"
              className="object-cover w-full h-full"
              width={400}
              height={300}
              alt="Kegiatan Doa Bersama"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
