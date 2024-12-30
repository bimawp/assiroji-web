import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ data }) {
  return (
    <footer className=" bg-[#1D564F] text-white">
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Image
            src="/image/logo.png"
            alt="MA AS-SIROJI Logo"
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h1 className="text-xl font-semibold">Madrasah Aliyah (MA)</h1>
            <h2 className="text-gray-400">AS-SIROJI</h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid gap-8 md:grid-cols-4">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold border-l-4 border-[#F7B118] pl-2">Contact Info</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400">Adress :</p>
              <p>JL.Toblong Rt 01 Rw 02</p>
              <p>Ds. Mekar Jaya Kec. Pacet Kab. Bandung</p>
            </div>
            <div>
              <p className="text-gray-400">Phone :</p>
              <p>{data.phone}</p>
            </div>
            <div>
              <p className="text-gray-400">Email :</p>
              <p>{data.email}</p>
            </div>
            {/* <div>
              <p className="text-gray-400">You Tube :</p>
              <p>{data.facebook}</p>
            </div> */}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold border-l-4 border-[#F7B118] pl-2">Menu</h3>
          <nav className="space-y-2">
            {['Home', 'Profil', 'Sarana', 'Prestasi', 'PPDB', 'Kontak'].map((item) => (
              <Link
                key={item}
                href="#"
                className="block p-2 hover:bg-gray-800 transition-colors border-b border-gray-500"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold border-l-4 border-[#F7B118] pl-2">Post A Comment</h3>
          <form className="mt-4 space-y-4 flex flex-col">
            <input
              placeholder="Enter Your Name ......."
              className="bg-gray-200 text-black border-gray-700 p-2 rounded-md"
            />
            <textarea
              placeholder="Enter Your Comment ......."
              className="bg-gray-200 text-black border-gray-700 min-h-[100px]  p-2 rounded-md"
            />
            <button className="bg-gray-700 py-2 rounded-sm hover:bg-gray-400">Publish</button>
          </form>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold border-l-4 border-[#F7B118] pl-2 mb-4">Comment</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-white rounded-full" />
              <div>
                <p className="font-medium">Angga Gufran</p>
                <p className="text-sm text-gray-400">Wih Website Baru Nih ;)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-white rounded-full" />
              <div>
                <p className="font-medium">Ade Husna</p>
                <p className="text-sm text-gray-400">Open PO lagi guys cheese roll nya ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
