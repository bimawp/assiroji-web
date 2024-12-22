'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
const navListItem = [
  {
    name: 'Section ekstrakulikuler',
    link: '/admin/manajement-content/home',
  },
  {
    name: 'Section gallery',
    link: '/admin/manajement-content/home/gallery',
  },
  {
    name: 'Section contact',
    link: '/admin/manajement-content/home/contact',
  },
];
export default function Layout({ children }) {
  const pathname = usePathname();
  return (
    <div className="w-full">
      <div className="py-2 w-2/4">
        <ul className=" flex items-center justify-between gap-1  rounded-lg bg-[#B7E0DF] ">
          {navListItem.map((item, index) => (
            <li className={`flex-1 p-1  w-full `} key={index}>
              <Link
                href={item.link}
                className={` ${
                  item.link === pathname ? 'bg-[#006D5B] text-white' : ''
                } rounded-lg text-center block w-full p-1 `}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <hr className="border-b-[1px] border-gray-200" />
      <div>{children}</div>
    </div>
  );
}