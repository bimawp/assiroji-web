import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export default function Footer({ data }) {
  const currentYear = new Date().getFullYear();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: 'Sarana', href: '/sarana' },
    { name: 'Prestasi', href: '/prestasi' },
    { name: 'PPDB', href: '/ppdb' },
    { name: 'Kontak', href: '/kontak' },
  ];

  return (
    <footer className="bg-[#1D564F] text-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 border-b border-gray-500 pb-6 mb-8">
          <Image
            src="/image/logo.png"
            alt="MA AS-SIROJI Logo"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold">Madrasah Aliyah (MA)</h1>
            <h2 className="text-xl text-gray-300">AS-SIROJI</h2>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-l-4 border-[#F7B118] pl-3">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#F7B118] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Address:</p>
                  <p className="text-gray-300">JL.Toblong Rt 01 Rw 02</p>
                  <p className="text-gray-300">Ds. Mekar Jaya Kec. Pacet Kab. Bandung</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#F7B118] flex-shrink-0" />
                <div>
                  <p className="font-semibold">Phone:</p>
                  <p className="text-gray-300">{data.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#F7B118] flex-shrink-0" />
                <div>
                  <p className="font-semibold">Email:</p>
                  <p className="text-gray-300">{data.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-l-4 border-[#F7B118] pl-3">Menu</h3>
            <nav className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 py-2 px-3 hover:bg-[#164239] transition-colors rounded-md group"
                >
                  <ExternalLink className="w-4 h-4 text-[#F7B118] group-hover:text-white transition-colors" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>


          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-l-4 border-[#F7B118] pl-3">Social Media</h3>
            <div className="flex space-x-4">
              <SocialIcon href="#" icon={Facebook} label="Facebook" />
              <SocialIcon href="#" icon={Instagram} label="Instagram" />
              <SocialIcon href="#" icon={Twitter} label="Twitter" />
              <SocialIcon href="#" icon={Youtube} label="YouTube" />
            </div>
          </div>


          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-l-4 border-[#F7B118] pl-3">Newsletter</h3>
            <p className="text-sm text-gray-300">Stay updated with our latest news and events.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 bg-[#164239] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7B118]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#F7B118] text-[#1D564F] font-semibold rounded-md hover:bg-[#e5a516] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#164239] py-4 text-center text-sm">
        <p>&copy; {currentYear} MA AS-SIROJI. All rights reserved.</p>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <a href={href} className="text-white hover:text-[#F7B118] transition-colors" aria-label={label}>
      <Icon className="h-6 w-6" />
    </a>
  );
}
