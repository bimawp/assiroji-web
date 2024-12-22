'use client';

import {
  Activity,
  Building,
  Building2,
  ChevronDown,
  ChevronRight,
  Contact,
  Contact2,
  FolderOpen,
  GalleryHorizontal,
  Home,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  LogOutIcon,
  Newspaper,
  Settings,
  Trophy,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
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
    name: 'Content Management',
    icon: LayoutTemplate,
    subItems: [
      {
        name: 'Page Home',
        link: '/admin/manajement-content/home',
        icon: Home,
      },
      {
        name: 'Page Guru',
        link: '/admin/manajement-content/guru',
        icon: Users,
      },
      {
        name: 'Page Sarana',
        link: '/admin/manajement-content/sarana',
        icon: Building2,
      },
      {
        name: 'Page Prestasi',
        link: '/admin/manajement-content/prestasi',
        icon: Trophy,
      },
      // {
      //   name: 'Ekstrakulikuler',
      //   link: '/admin/manajement-content/ekstrakulikuler',
      //   icon: Activity,
      // },
      // {
      //   name: 'Gallery',
      //   link: '/admin/manajement-content/gallery',
      //   icon: GalleryHorizontal,
      // },
      // {
      //   name: 'Contact',
      //   link: '/admin/manajement-content/contact',
      //   icon: Contact2,
      // },
      // {
      //   name: 'Guru',
      //   link: '/admin/manajement-content/guru',
      //   icon: Users,
      // },
      // {
      //   name: 'Sarana',
      //   link: '/admin/manajement-content/sarana',
      //   icon: Building2,
      // },
      // {
      //   name: 'Prestasi',
      //   link: '/admin/manajement-content/prestasi',
      //   icon: Trophy,
      // },
    ],
  },
  {
    name: 'Article Management',
    link: '/admin/artikel',
    icon: Newspaper,
  },
  // {
  //   name: 'Student Admission',
  //   link: '/admin/student-admision',
  //   icon: UserPlus,
  // },
  // {
  //   name: 'System Setting',
  //   link: '/admin/setting',
  //   icon: Settings,
  // },
];

export default function AppshellAdmin({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(1);
  const pathname = usePathname();
  console.log(openSubmenu);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

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
          } `}
        >
          <div className="px-3 flex flex-col h-full">
            <div className="flex items-center h-28 w-full gap-4">
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
            <nav className="flex-1 flex flex-col justify-between">
              <ul className="flex flex-col gap-3 pt-4">
                {navItems.map((item, index) => (
                  <li key={item.name}>
                    {item.subItems ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(index)}
                          className={`flex items-center gap-3 py-2 px-2 rounded-md transition-all duration-200 ease-in-out w-full  text-sm  text-left ${
                            isActive(item.link)
                              ? 'bg-white text-[#1D564F]'
                              : 'text-white hover:bg-white/10'
                          } ${isCollapsed ? 'justify-center' : ''}`}
                        >
                          <item.icon size={22} />
                          {!isCollapsed && (
                            <>
                              <span>{item.name}</span>
                              <ChevronDown
                                size={20}
                                className={`ml-auto transition-transform ${
                                  openSubmenu === index ? 'rotate-180' : ''
                                }`}
                              />
                            </>
                          )}
                        </button>
                        {!isCollapsed && openSubmenu === index && (
                          <ul className="ml-4 mt-2">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  href={subItem.link}
                                  className={`flex items-center gap-3 py-2 my-1 px-2 rounded-md transition-all duration-200 text-sm ease-in-out ${
                                    isActive(subItem.link)
                                      ? 'bg-white text-[#1D564F]'
                                      : 'text-white hover:bg-white/10'
                                  }`}
                                >
                                  <subItem.icon size={22} />
                                  <span>{subItem.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.link}
                        className={`flex items-center gap-3 py-2 px-2 rounded-md transition-all duration-200 ease-in-out text-sm  ${
                          isActive(item.link)
                            ? 'bg-white text-[#1D564F]'
                            : 'text-white hover:bg-white/10'
                        } ${isCollapsed ? 'justify-center w-14' : ''}`}
                      >
                        <item.icon size={22} />
                        {!isCollapsed && <span>{item.name}</span>}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className=" w-full py-4 ">
                <div className="bg-[#006D5B] rounded-md flex flex-col gap-2 p-3">
                  <div className="flex gap-2 border-b border-b-slate-400 py-3">
                    <User />
                    {!isCollapsed && <p className="font-extralight">Administrator</p>}
                  </div>
                  <button className=" flex items-center gap-2 py-2 font-bold rounded-md">
                    <LogOutIcon />
                    {!isCollapsed && 'Logout'}
                  </button>
                </div>
              </div>
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
