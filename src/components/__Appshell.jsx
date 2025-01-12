'use client';
import { AlignJustify, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const menuItems = [
  { name: 'Home', href: '/' },
  {
    name: 'Profile',
    isDropdown: true,
    items: [
      { name: 'PROFILE', href: '/profile/' },
      { name: 'SEJARAH', href: '/profile/sejarah' },
      { name: 'VISI & MISI', href: '/profile/visi-misi' },
      { name: 'GURU & KARYAWAN', href: '/profile/guru-dan-karyawan' },
      { name: 'KURIKULUM', href: '/profile/kurikulum' },
      { name: 'KALENDER AKADEMIK', href: '/profile/kalender-akademik' },
    ],
  },
  { name: 'Sarana', href: '/sarana' },
  { name: 'Prestasi', href: '/prestasi' },
  { name: 'PPDB', href: '/ppdb' },
  { name: 'Contact', href: '/contact' },
];

export default function Appshell() {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => setSidebar((prev) => !prev);
  const closeSidebar = () => setSidebar(false);

  return (
    <header className="h-24 shadow-lg">
      <div className="flex h-full items-center justify-between px-4 lg:px-12">
        <div className="flex items-center gap-3">
          <Image
            src="/image/logo.png"
            width={80}
            height={80}
            alt="logo"
            className="w-auto lg:h-16 h-12"
          />
          <Link href="/" className="font-bold text-sm lg:text-lg">
            Madrasah Aliyah (MA) <br />
            AS-SIROJI
          </Link>
        </div>

        <button
          className="cursor-pointer lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <AlignJustify size={24} />
        </button>

        <nav
          className={`fixed lg:relative top-0 left-0 h-screen lg:h-auto w-3/4 max-w-sm bg-black lg:bg-transparent text-white lg:text-black lg:flex lg:items-center lg:justify-end lg:w-auto z-50 transition-transform transform ${
            sidebar ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 p-6 lg:p-0">
            {menuItems.map((menu, index) => (
              <li key={index} className="relative group">
                {menu.isDropdown ? (
                  <div>
                    <div className="hidden lg:block">
                      <button
                        className="flex items-center gap-1 group-hover:text-blue-500"
                        aria-expanded="false"
                      >
                        {menu.name}
                        <ChevronDown size={16} />
                      </button>
                      <ul
                        className="absolute left-0 mt-2 w-56 bg-white text-black rounded-md shadow-md transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-2"
                        role="menu"
                      >
                        {menu.items.map((subItem, subIndex) => (
                          <li key={subIndex} className="hover:bg-gray-100 hover:text-black">
                            <Link
                              href={subItem.href}
                              className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                              onClick={closeSidebar}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="block lg:hidden">
                      <button
                        className="flex items-center gap-1"
                        onClick={toggleSidebar}
                        aria-expanded={sidebar ? 'true' : 'false'}
                      >
                        {menu.name}
                      </button>
                      <ul
                        className={`mt-2 space-y-2 transition-all duration-300 ${
                          sidebar ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                        role="menu"
                      >
                        {menu.items.map((subItem, subIndex) => (
                          <li key={subIndex} className="hover:bg-gray-100 hover:text-black">
                            <Link
                              href={subItem.href}
                              className="block px-4 py-2"
                              onClick={closeSidebar}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link href={menu.href} onClick={closeSidebar}>
                    {menu.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {sidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </header>
  );
}
