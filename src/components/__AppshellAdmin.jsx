'use client';

import { formatTanggal } from '@/lib/date';
import {
  Building2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LayoutTemplate,
  LogOutIcon,
  Trophy,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
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
    icon: FileText,
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
        name: 'Page Profile',
        link: '/admin/manajement-content/profile/guru',
        icon: Users,
      },
      {
        name: 'Page Sarana dan prasarana',
        link: '/admin/manajement-content/sarana',
        icon: Building2,
      },
      {
        name: 'Page Prestasi',
        link: '/admin/manajement-content/prestasi',
        icon: Trophy,
      },
    ],
  },
  {
    name: 'Kelola PPDB',
    icon: ClipboardList,
    subItems: [
      {
        name: 'New Student Enrollment',
        link: '/admin/ppdb/l',
        icon: UserPlus,
      },
      {
        name: 'Selection Process',
        link: '/admin/ppdb/seleksi-ppdb',
        icon: Building2,
      },
      {
        name: 'Admission Log',
        link: '/admin/ppdb/riwayat-ppdb',
        icon: Trophy,
      },
    ],
  },
];

export default function AppshellAdmin({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(1);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  // console.log('expire session : ', formatTanggal(session?.expires));
  // console.log('session : ', session);
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
    <div>
      <ConfirmLogoutModal
        isOpen={logoutModal}
        onClose={() => setLogoutModal(false)}
        onConfirm={async () => {
          try {
            setIsLoading(true);
            await signOut({ redirect: true, callbackUrl: '/admin/login' });
            setLogoutModal(false);
          } catch (error) {
            console.error('Error during logout:', error);
          } finally {
            setIsLoading(false);
          }
        }}
      />
      <div className="relative bg-[#1D564F]">
        <div className="flex">
          <aside
            className={`fixed z-20 top-0 left-0 h-screen bg-[#1D564F] text-white transition-all duration-300 ease-in-out ${
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
                    <div className="flex gap-2 border-b items-center border-b-slate-400 py-3">
                      <User />
                      {session ? (
                        !isCollapsed && <p className="font-extralight">{session?.user.name}</p>
                      ) : (
                        <div className="h-4 w-2/4 animate-pulse rounded bg-gray-400" />
                      )}
                    </div>
                    <button
                      className=" flex items-center gap-2 py-2 font-bold rounded-md "
                      onClick={() => setLogoutModal(true)}
                    >
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
            <div className="bg-gray-50 rounded-lg min-h-screen">
              <button
                className={`fixed top-1/2 z-[22] -translate-y-1/2 p-1 rounded-full text-white bg-[#F7B118] border-4 border-white hover:bg-orange-400 transition-all duration-300 ease-in-out ${
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
    </div>
  );
}

function ConfirmLogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`relative m-4 max-w-md w-full rounded-lg bg-white p-6 text-blue-gray-500 shadow-2xl transition-transform duration-300  ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
        <p className="mb-4">Yakin logout?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  );
}
