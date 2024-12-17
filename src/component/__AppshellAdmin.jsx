'use client';
import { ChevronRight, LayoutDashboard, Newspaper, UserCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useState } from 'react';
const navItem = [
  {
    name: 'Dashboard',
    link: '/admin',
    icon: <LayoutDashboard size={28} />,
  },
  {
    name: 'Artikel',
    link: '/admin/artikel',
    icon: <Newspaper size={28} />,
  },
  {
    name: 'duka',
    link: '/admin/duka',
    icon: <LayoutDashboard size={28} />,
  },
];
export default function AppshellAdmin({ children }) {
  const [resize, setResize] = useState(false);
  const onResize = () => setResize(!resize);
  const pathname = usePathname();

  return (
    <div className="relative bg-[#1D564F] ">
      <div className="flex justify-end bg-[#1D564F]">
        <div className="top-0 fixed w-full px-4 py-4 bg-[#1D564F] left-0 h-screen">
          <div className={` ${resize ? 'w-full' : 'w-[370px]'} `}>
            <div className="flex items-center gap-4  pb-4 text-white">
              <Image src="/image/logo.png" width={60} height={60} alt="logo" />
              <div>
                {!resize && (
                  <>
                    <h2 className="">Madrasah Aliyah</h2>
                    <h3>AS-SIROJI</h3>
                  </>
                )}
              </div>
            </div>
            <hr className={`${!resize ? '' : 'w-14'}`} />
            <ul className={`  flex flex-col gap-3 pt-4`}>
              {navItem.map((item, index) => (
                <li
                  key={index}
                  className={`${
                    pathname === item.link ? 'bg-white text-[#1D564F]' : 'text-white'
                  } ${
                    !resize ? '' : 'w-14 flex items-center justify-center'
                  } py-4 px-2 rounded-md transition-all ease-in-out`}
                >
                  <Link
                    href={item.link}
                    className="flex items-center gap-3 transition-all ease-in-out"
                  >
                    {item.icon}
                    {!resize && item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`${
            resize ? 'w-[96.5%]' : 'w-[80%]'
          } p-4 z-20 relative transition-all ease-in-out`}
        >
          <button
            className={`absolute -left-2 hover:bg-orange-400 z-[99] top-[400px] p-1 rounded-full transform  ${
              resize ? 'rotate-0' : 'rotate-180'
            } text-white bg-[#F7B118] border-4 border-white transition-all ease-in-out`}
            onClick={onResize}
          >
            <ChevronRight size={28} />
          </button>
          <div className="w-full bg-white rounded-lg p-4 min-h-screen">{children}</div>
        </div>
      </div>
    </div>
  );
}
