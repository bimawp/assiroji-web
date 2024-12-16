import Image from 'next/image';
const roomData = [
  { no: 1, name: 'R. Kepala', quantity: 1, volume: '19 m²', condition: 1 },
  { no: 2, name: 'R. TU', quantity: 1, volume: '17.5 m²', condition: 1 },
  { no: 3, name: 'R. Kelas', quantity: 26, volume: '1472 m²', condition: 23 },
  { no: 4, name: 'R. Perpustakaan', quantity: 1, volume: '72 m²', condition: 1 },
  {
    no: 5,
    name: 'R. Lab IPA (Fisika, Biologi, Kimia)',
    quantity: 1,
    volume: '72 m²',
    condition: 1,
  },
  { no: 6, name: 'R. Lab Komputer', quantity: 1, volume: '72 m²', condition: 1 },
  { no: 7, name: 'R. Lab Bahasa', quantity: 1, volume: '72 m²', condition: 1 },
  { no: 8, name: 'R. OSIS dan Ekskul', quantity: 2, volume: '72 m²', condition: 1 },
  { no: 9, name: 'R. BP/BK', quantity: 1, volume: '19 m²', condition: 1 },
  { no: 10, name: 'WC Guru/da Karyawan', quantity: 2, volume: '26 m²', condition: 1 },
  { no: 11, name: 'WC Siswa', quantity: 35, volume: '80 m²', condition: 1 },
  { no: 12, name: 'GOR', quantity: 1, volume: '450 m²', condition: 1 },
  { no: 13, name: 'Masjid', quantity: 2, volume: '450 m²', condition: 2 },
  { no: 14, name: 'Lapangan Olah Raga', quantity: 2, volume: '1000 m²', condition: 2 },
  { no: 15, name: 'R. Koperasi Madrasah', quantity: 1, volume: '20 m²', condition: 1 },
  { no: 16, name: 'R. Satpam', quantity: 1, volume: '6 m²', condition: 1 },
  { no: 17, name: 'R. Piket', quantity: 1, volume: '6 m²', condition: 1 },
  { no: 18, name: 'R. Gudang', quantity: 1, volume: '40 m²', condition: 1 },
  { no: 19, name: 'Taman Kosong', quantity: 0, volume: '7.945 m²', condition: 0 },
  { no: 20, name: 'R. Perpustakaan', quantity: 1, volume: '80 m²', condition: 1 },
  { no: 21, name: 'R. UKS (Poliklinik)', quantity: 1, volume: '120 m²', condition: 1 },
];

export default function SaranaPage() {
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
          <h1 className="text-2xl font-bold">SARANA</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto space-y-6 pb-20 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="p-4 bg-white/20 rounded-lg overflow-hidden">
                <Image
                  src="/image/logo.png"
                  className="m-auto"
                  width={200}
                  height={200}
                  alt="image"
                />
                <p className="text-center py-2 text-sm">Keterangan</p>
              </div>
            ))}
        </div>
        <div className="w-full bg-white rounded-md">
          <div>
            <h2 className="text-xl font-bold text-center py-4">Data Ruangan</h2>
          </div>
          <div>
            <div className="rounded-md  p-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-[80px]">No</th>
                    <th>Nama Bangunan</th>
                    <th className="text-center">Jml</th>
                    <th className="text-center">Vol</th>
                    <th className="text-center">Kondisi</th>
                  </tr>
                </thead>
                <tbody>
                  {roomData.map((room) => (
                    <tr key={room.no}>
                      <td className="text-center">{room.no}</td>
                      <td>{room.name}</td>
                      <td className="text-center">{room.quantity}</td>
                      <td className="text-center">{room.volume}</td>
                      <td className="text-center">{room.condition}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-400 rounded-md">
                    <td className="text-center" colSpan={2}>
                      Jumlah
                    </td>
                    <td className="text-center">50</td>
                    <td></td>
                    <td className="text-center">32</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
