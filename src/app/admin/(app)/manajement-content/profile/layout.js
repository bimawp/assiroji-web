'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
const navListItem = [
  {
    name: 'Section guru',
    link: '/admin/manajement-content/profile/guru',
  },
  {
    name: 'Section kurikulum',
    link: '/admin/manajement-content/profile/kurikulum',
  },
  {
    name: 'Section Kalender',
    link: '/admin/manajement-content/profile/kalender',
  },
];
export default function Layout({ children }) {
  const pathname = usePathname();
  return (
    <div className="w-full">
      <div className="bg-white border-b border-gray-200">
        <div className="p-4 w-2/4">
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
      </div>

      <div className="px-4">{children}</div>
    </div>
  );
}
