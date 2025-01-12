import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function SocialMediaCard({ data }) {
  console.log('data : ', data);
  const item = [
    { src: '/image/facebook.png', link: data.facebook },
    { src: '/image/instagram2.png', link: data.instagram },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {item.map((Icon, index) => (
        <div key={index} className="bg-[#ffc107] rounded-lg">
          <div className="p-4 flex items-center justify-center">
            <Link
              href={Icon.link}
              className="text-white hover:text-[#009688] transition-colors"
              aria-label={Icon.name}
            >
              <Image
                src={Icon.src}
                alt="media sosial"
                width={600}
                height={400}
                className="w-full h-[30px] object-cover "
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
