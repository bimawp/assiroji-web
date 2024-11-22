'use client';
import Image from 'next/image';
import Link from 'next/link';
const listProfile = [
  {
    name: 'SEJARAH',
    href: '/sejarah',
  },
  {
    name: 'VISI & MISI',
    href: '/visi-misi',
  },
  {
    name: 'GURU & KARYAWAN',
    href: '/guru-karyawan',
  },
  {
    name: 'KURIKULUM',
    href: '/kurikulum',
  },
  {
    name: 'KALENDER AKADEMIK',
    href: '/kalender',
  },
];
export default function Appshell() {
  return (
    <div className="h-24 ">
      <div className="flex h-full items-center justify-around">
        <div className="flex items-center gap-3 ">
          <Image src="/image/logo.png" width={80} height={80} alt="logo" />
          <h1 className="font-bold">
            Madrasah Aliyah (MA) <br />
            AS-SIROJI
          </h1>
        </div>
        <ul className="hidden lg:flex items-center gap-12">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <button href={'#'} className="px-3 relative py-1 cursor-pointer group">
              Profile
              <span className="ml-2 transition-all ease-in-out group-hover-text"></span>
              <div
                className={`left-0 z-10 max-h-0 mt-2 text-black transition-[max-height] duration-500 ease-in-out bg-white rounded-lg shadow-lg lg:absolute top-10 w-[210px] group-hover:max-h-[190px] overflow-hidden`}
              >
                <ul className=" text-black p-4 rounded-md transition-all ease-in-out bg-white flex flex-col items-start ">
                  {listProfile &&
                    listProfile.map((item, index) => (
                      <li className='border-b border-gray-400 mb-2 hover:bg-gray-400' key={index}>
                        <Link href={item.href}>{item.name}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            </button>
          </li>
          <li>
            <Link href="/sarana">Sarana</Link>
          </li>
          <li>
            <Link href="/prestasi">Prestasi</Link>
          </li>
          <li>
            <Link href="/ppdb">PPDB</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
