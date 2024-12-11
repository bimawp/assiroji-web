'use client';
import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  { name: 'Home', href: '/' },
  {
    name: 'Profile',
    isDropdown: true,
    items: [
      {
        name: 'SEJARAH',
        href: '/profile/sejarah',
      },
      {
        name: 'VISI & MISI',
        href: '/profile/visi-misi',
      },
      {
        name: 'GURU & KARYAWAN',
        href: '/profile/guru-dan-karyawan',
      },
      {
        name: 'KURIKULUM',
        href: '/profile/kurikulum',
      },
      {
        name: 'KALENDER AKADEMIK',
        href: '/profile/kalender-akademik',
      },
    ],
  },
  { name: 'Sarana', href: '/sarana' },
  { name: 'Prestasi', href: '/prestasi' },
  { name: 'PPDB', href: '/ppdb' },
  { name: 'Contact', href: '/contact' },
];

export default function Appshell() {
  const navigation = useRouter();
  const [sidebar, setSidebar] = useState(false);
  const sidebarActive = () => setSidebar(!sidebar);
  return (
    <div className="h-24 ">
      <div className="flex h-full items-center justify-around">
        <div className="flex items-center gap-3 ">
          <Image
            src="/image/logo.png"
            width={80}
            height={80}
            alt="logo"
            className="w-auto lg:h-16 h-12"
          />
          <h1 className="font-bold text-sm lg:text-lg">
            Madrasah Aliyah (MA) <br />
            AS-SIROJI
          </h1>
        </div>
        <span className="cursor-pointer lg:hidden" onClick={sidebarActive}>
          <AlignJustify />
        </span>
        <ul
          className={`transform transition ease-in-out delay-150 ${
            sidebar ? '-translate-x-full' : 'translate-x-0'
          } flex flex-col items-center justify-center gap-12 w-full h-screen bg-black bg-opacity-[0.9] text-white absolute top-0 z-[99] mt-24 
    lg:transform-none lg:flex-row lg:w-auto lg:h-auto lg:relative lg:justify-normal lg:bg-white lg:text-black lg:items-center lg:mt-0`}
        >
          {menuItems.map((menu, index) => (
            <li key={index}>
              {menu.isDropdown ? (
                <button className="px-3 relative py-1 cursor-pointer group flex">
                  <p
                    onClick={() => {
                      navigation.push('/profile');
                      sidebarActive();
                    }}
                  >
                    {menu.name}
                  </p>
                  <span className="ml-2 transition-all ease-in-out group-hover-text"></span>
                  <div
                    className={`left-0 z-10 max-h-0 mt-2 text-black transition-[max-height] duration-500 ease-in-out bg-white rounded-lg shadow-lg lg:absolute top-10 w-[240px] group-hover:max-h-[190px] group-hover:z-50 overflow-hidden`}
                  >
                    <ul className=" text-black p-4 rounded-md transition-all ease-in-out bg-white flex flex-col items-start ">
                      {menu.items.map((subItem, subIndex) => (
                        <li
                          className="border-b border-gray-400 mb-2 hover:bg-gray-400"
                          key={subIndex}
                        >
                          <Link href={subItem.href} onClick={sidebarActive}>
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              ) : (
                <Link href={menu.href} onClick={sidebarActive}>
                  {menu.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
