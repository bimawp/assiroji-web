import Image from 'next/image';

export default function Header({ h1Content, subtitle, backgroundImage }) {
  return (
    <div className="relative w-full h-48 md:h-[300px] rounded-lg overflow-hidden">
      <Image src={backgroundImage} alt="Header Background" fill className="object-cover" />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-center tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 drop-shadow-lg max-w-4xl">
          {h1Content}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-2xl font-light italic">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
