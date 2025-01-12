import Header from '@/components/__Header';
import Image from 'next/image';
import SarananaCard from './SarananaCard';

export default function SaranaDanPrasaranaPage({ data }) {
  return (
    <div className="bg-gradient-to-b from-teal-200 to-teal-400 p-4 md:p-0 text-black">
      <Header
        h1Content="Sarana"
        subtitle="Fasilitas Pendukung Pendidikan Berkualitas"
        backgroundImage="/image/rumah.png"
      />
      <div className="flex flex-col items-center text-center space-y-4 -mt-10 z-10 relative">
        <Image
          src="/image/logo.png"
          alt="MA AS-SIROJI Logo"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>
      <div className="max-w-7xl mx-auto space-y-6 pb-20 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {data &&
            data?.sarana.map((sarana, index) => (
              <div
                key={sarana['id_sarana']}
                className="p-4 bg-white/20 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <SarananaCard data={sarana} />
              </div>
            ))}
        </div>
        <div className="w-full bg-white rounded-md">
          <div>
            <h2 className="text-xl font-bold text-center py-4">Data Prasarana</h2>
          </div>
          <div>
            <div className="rounded-md  p-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-[80px]">No</th>
                    <th>Nama prasarana</th>
                    <th className="text-center">Jml</th>
                    <th className="text-center">Kondisi</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.prasarana.map((room, index) => (
                      <tr key={room['id_prasarana']}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{room.name}</td>
                        <td className="text-center">{room.quantity}</td>
                        <td className="text-center">{room.condition}</td>
                      </tr>
                    ))}
                  {/* <tr className="bg-gray-400 rounded-md">
                    <td className="text-center" colSpan={2}>
                      Jumlah
                    </td>
                    <td className="text-center">50</td>

                    <td className="text-center">32</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
