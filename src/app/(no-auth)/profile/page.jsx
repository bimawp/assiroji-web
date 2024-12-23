import Header from '@/components/__Header';
import Image from 'next/image';

export default function ProfilePage() {
  const schoolInfo = [
    { label: 'Nama Yayasan', value: 'Badrul Ulum Al Islam' },
    { label: 'Nama Madrasah', value: 'As-Siroji' },
    { label: 'Nomor Statistik Madrasah', value: '131232040042' },
    { label: 'N P S N', value: '20279959' },
    { label: 'Akreditasi Madrasah', value: 'B' },
    { label: 'Alamat', value: 'Toblong' },
    { label: 'Rt / Rw', value: '01 / 08' },
    { label: 'Desa', value: 'Mekarjaya' },
    { label: 'Kecamatan', value: 'Pacet' },
    { label: 'Kabupaten', value: 'Bandung' },
    { label: 'Provinsi', value: 'Jawa Barat' },
    { label: 'No. Telp', value: '085353802722' },
    { label: 'Website', value: 'www.maassiroji.sch.id' },
    { label: 'E-mail', value: 'siroji@gmail.com' },
    { label: 'Nama Kepala', value: 'N. Dewi Hasanah M Pd.i' },
  ];

  const enrollmentData = [
    { year: '2021-2022', students: 246 },
    { year: '2022-2023', students: 260 },
    { year: '2023-2024', students: 294 },
  ];

  return (
    <div className=" bg-gradient-to-b from-teal-200 to-teal-400 p-4 md:p-0 text-black">
      <Header
        h1Content="Profil"
        subtitle="Membentuk Karakter, Mengasah Potensi, Meraih Prestasi"
        backgroundImage="/image/rumah.png"
      />
      <div className="flex flex-col items-center text-center space-y-4 -mt-10 md:-mt-16 z-10 relative">
        <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 relative">
          <Image
            src="/image/logo.png"
            alt="MA AS-SIROJI Logo"
            fill
            className="rounded-full object-cover"
          />
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
          <table>
            <tbody>
              {schoolInfo.map((info) => (
                <tr key={info.label}>
                  <td className="font-medium w-[500px]">{info.label}</td>
                  <td className="w-2/3">{info.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-20 bg-gray-200 rounded-md p-2">
          <div className="grid grid-cols-3 gap-4 text-center">
            {enrollmentData.map((data) => (
              <div key={data.year} className="space-y-2">
                <h3 className="font-medium">{data.year}</h3>
                <p className="text-3xl font-bold">{data.students}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
