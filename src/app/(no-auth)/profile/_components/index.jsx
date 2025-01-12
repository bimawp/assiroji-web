import Header from '@/components/__Header';
import Image from 'next/image';

export default function ProfilePage({ data }) {
  const schoolInfo = [
    { label: 'Nama Yayasan', value: data.namaYayasan },
    { label: 'Nama Madrasah', value: data.namaMadrasah },
    { label: 'Nomor Statistik Madrasah', value: data.nomorStatistik },
    { label: 'N P S N', value: data.npsn },
    { label: 'Akreditasi Madrasah', value: data.akreditasi },
    { label: 'Alamat', value: data.alamat },
    { label: 'Rt / Rw', value: data.rt },
    { label: 'Desa', value: data.desa },
    { label: 'Kecamatan', value: data.kecamatan },
    { label: 'Kabupaten', value: data.kabupaten },
    { label: 'Provinsi', value: data.provinsi },
    { label: 'No. Telp', value: data.noTelp },
    { label: 'E-mail', value: data.email },
    { label: 'Nama Kepala', value: data.namaKepala },
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
            {data?.siswaTahunan.map((data, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium">{data.tahun}</h3>
                <p className="text-3xl font-bold">{data.jumlahSiswa}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
