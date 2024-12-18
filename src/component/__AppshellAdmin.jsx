'use client';

import { ChevronRight, LayoutDashboard, Newspaper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const navItems = [
  {
    name: 'Dashboard',
    link: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Artikel',
    link: '/admin/artikel',
    icon: Newspaper,
  },
  {
    name: 'Duka',
    link: '/admin/duka',
    icon: LayoutDashboard,
  },
];

export default function AppshellAdmin({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const isActive = (path) => {
    if (path === '/admin') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="relative bg-[#1D564F]">
      <div className="flex">
        <aside
          className={`fixed top-0 left-0 h-screen bg-[#1D564F] text-white transition-all duration-300 ease-in-out ${
            isCollapsed ? 'w-20' : 'w-[300px]'
          }`}
        >
          <div className="px-3 h-28">
            <div className="flex items-center h-full w-full gap-4">
              <Image
                src="/image/logo.png"
                width={60}
                height={60}
                alt="Madrasah Aliyah AS-SIROJI logo"
              />
              {!isCollapsed && (
                <div>
                  <h2 className="text-lg font-semibold">Madrasah Aliyah</h2>
                  <h3 className="text-sm">AS-SIROJI</h3>
                </div>
              )}
            </div>
            <hr className={`border-white/20 ${isCollapsed ? '' : 'w-full'}`} />
            <nav>
              <ul className="flex flex-col gap-3 pt-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className={`flex items-center gap-3 py-4 px-2 rounded-md transition-all duration-200 ease-in-out ${
                        isActive(item.link)
                          ? 'bg-white text-[#1D564F]'
                          : 'text-white hover:bg-white/10'
                      } ${isCollapsed ? 'justify-center w-14' : ''}`}
                    >
                      <item.icon size={28} />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <main
          className={`flex-grow transition-all duration-300 ease-in-out ${
            isCollapsed ? 'ml-[80px]' : 'ml-[300px]'
          }`}
        >
          <div className="bg-white rounded-lg p-4 min-h-screen">
            <button
              className={`fixed top-1/2 -translate-y-1/2 p-1 rounded-full text-white bg-[#F7B118] border-4 border-white hover:bg-orange-400 transition-all duration-300 ease-in-out ${
                isCollapsed ? 'left-[60px] rotate-0' : 'left-[276px] rotate-180'
              }`}
              onClick={toggleSidebar}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronRight size={28} />
            </button>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
