import Image from 'next/image';

export default async function guruKaryawanPage() {
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
          <h1 className="text-2xl font-bold">GURU & KARYAWAN</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto space-y-6 pb-20 mt-10">
        <div className="relative z-20">
          <div className="absolute -z-10 w-full h-full flex">
            <Image
              src="/image/logo.png"
              alt="MA AS-SIROJI Logo"
              width={300}
              height={300}
              className="rounded-full w-[400px] right-1/2 left-1/2 m-auto opacity-[0.1]"
            />
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {Array(11)
                .fill({
                  name: 'N. Dewi Hasanah M Pd.i',
                  position: 'Kepala Madrasah',
                  image: '/placeholder.svg?height=120&width=120',
                })
                .map((staff, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-32 h-32 mb-4 overflow-hidden rounded-full bg-gray-100">
                      <Image
                        src={staff.image}
                        alt={staff.name}
                        className="w-full h-full object-cover"
                        width={200}
                        height={200}
                      />
                    </div>
                    <h3 className="font-medium text-center">{staff.name}</h3>
                    <p className="text-sm text-gray-700">{staff.position}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
