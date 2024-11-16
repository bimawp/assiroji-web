import Berita from "@/component/__Berita";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="">
      <div className="">
        <Image
          src="/image/rumah.jpeg"
          className="w-full md:h-screen h-auto"
          width={1200}
          height={1200}
          alt="rumah"
        />
      </div>
      <div className="bg-[#B7e0df] py-20">
        <div className="bg-[#F7B118] w-[80%] m-auto rounded-xl p-4">
          <p className="text-white font-bold text-3xl text-center">
            Terwujudnya Madrasah Sebagai Lembaga Pendidikan Yang Islami Dan
            Unggul
          </p>
          <button className="flex items-center gap-2 m-auto bg-[#039786] px-5 py-3 mt-4 hover:opacity-[0.3] rounded-md">
            <ArrowRight className="text-white border-white border-2 rounded-full" />
            <p className="text-white font-bold text-xl">Visi & Misi</p>
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-br text-white py-10 px-4 from-[#039786] to-[#74e8e5] relative">
        <Image
          src="/image/rounded.png"
          className="absolute -top-12 left-10"
          width={200}
          height={200}
          alt="rumah"
        />
        <div className="max-w-7xl w-auto m-auto mt-10">
          <h2 className="text-center text-[#f7b118] font-bold text-4xl">
            BERITA
          </h2>
          <div className="w-full ">
            <div className="w-full flex items-center gap-4 ">
              <div className="h-1 w-[100%] bg-white rounded-md" />
              <div className="flex items-cente w-[] gap-6">
                <div className="w-6 h-6 bg-[#f7b118] rotate-45" />
                <div className="w-6 h-6 bg-[#f7b118] rotate-45" />
              </div>
            </div>
          </div>
          <div className="w-full mt-4">
            <Berita />
          </div>
        </div>
      </div>
      <div className=" text-white p-4  bg-[#B7e0df] relative">
        <Image
          src="/image/rounded2.png"
          className="absolute -top-12 right-10"
          width={200}
          height={200}
          alt="rumah"
        />
        <div className="max-w-7xl w-auto m-auto mt-10 py-10">
          <h2 className="text-center text-[#f7b118] font-bold text-4xl mb-20">
            EKSTRAKULIR
          </h2>
          <div className="w-full flex items-center justify-center flex-wrap gap-5">
            {Array.from({ length: 6 }, (_, index) => (
              <div className=" p-4 bg-white" key={index}>
                <div className="w-[300px] h-[200px]">
                  <Image
                    src="/image/KEGIATAN DO'A BERSAMA.jpeg"
                    className="object-cover w-full h-full"
                    width={200}
                    height={200}
                    alt="Kegiatan Doa Bersama"
                  />
                </div>
                <p className="mt-2 text-black">Pramuka</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br text-white p-4 from-[#039786] to-[#74e8e5] relative">
        <div className="max-w-7xl w-auto m-auto mt-10">
          <h2 className="text-center text-[#f7b118] font-bold text-4xl mt-20">
            GALERY
          </h2>
          <div className="w-full ">
            <div className="w-full flex items-center gap-4 ">
              <div className="flex items-cente w-[] gap-6">
                <div className="w-6 h-6 bg-[#f7b118] rotate-45" />
                <div className="w-6 h-6 bg-[#f7b118] rotate-45" />
              </div>
              <div className="h-1 w-[100%] bg-white rounded-md" />
            </div>
            <div className="w-full flex items-center justify-center mt-10 flex-wrap gap-5">
              {Array.from({ length: 6 }, (_, index) => (
                <div className="" key={index}>
                  <div className="w-[300px] h-[200px]">
                    <Image
                      src="/image/KEGIATAN DO'A BERSAMA.jpeg"
                      className="object-cover w-full h-full"
                      width={200}
                      height={200}
                      alt="Kegiatan Doa Bersama"
                    />
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
