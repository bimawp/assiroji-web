import Image from 'next/image';

export default function PrestasiPage() {
  return (
    <div className=" bg-[#40E0D0] p-4 md:p-0 text-black">
      <div>
        <div className="relative w-full h-48 md:h-[600px] rounded-lg overflow-hidden">
          <Image src="/image/rumah.jpeg" alt="Madrasah Building" fill className="object-cover" />
        </div>
        <div className="flex flex-col items-center text-center space-y-4 -mt-10 z-10 relative">
          <Image
            src="/image/logo.png"
            alt="MA AS-SIROJI Logo"
            width={120}
            height={120}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold">PRESTASI</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto space-y-6 pb-20 mt-10"></div>
    </div>
  );
}
