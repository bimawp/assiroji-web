import Image from 'next/image';
import React from 'react';

export default function SocialMediaCard() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {[{ src: '/image/facebook.png' }, { src: '/image/instagram2.png' }].map((Icon, index) => (
        <div key={index} className="bg-[#ffc107] rounded-lg">
          <div className="p-4 flex items-center justify-center">
            <a
              href="#"
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
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
