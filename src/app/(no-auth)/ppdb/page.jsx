import Image from 'next/image';
const scheduleItems = [
  { id: 1, title: 'Pendaftaran', date: '18 Januari - 6 Februari 2025' },
  { id: 2, title: 'Seleksi', date: '8 Februari 2025' },
  { id: 3, title: 'Pengumuman', date: '15 Februari 2025' },
  { id: 4, title: 'Daftar Ulang', date: '17-23 Februari 2025' },
];

const navigationItems = [
  { id: 1, icon: '📅', label: 'Jadwal' },
  { id: 2, icon: '💰', label: 'Biaya' },
  { id: 3, icon: '📋', label: 'Ketentuan' },
  { id: 4, icon: '📞', label: 'Kontak' },
];
export default function PpdbPage() {
  return (
    <div className=" bg-[#40E0D0] p-4 md:p-0 text-black">
      <div>
        <div className="relative w-full h-48 md:h-[600px] rounded-lg overflow-hidden">
          <Image src="/image/rumah.png" alt="Madrasah Building" fill className="object-cover" />
        </div>
        <div className="flex flex-col items-center text-center space-y-4 -mt-10 z-10 relative">
          <Image
            src="/image/logo.png"
            alt="MA AS-SIROJI Logo"
            width={120}
            height={120}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold">PPDB</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto space-y-6 pb-20 mt-10">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="order-2 md:order-1">
            <h3 className="text-lg font-semibold mb-4">
              Informasi penerimaan Santri Baru Madrasah Aliyah As Siroji tahun pelajaran 2025-2026:
            </h3>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 transition-colors"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Schedule Table */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {scheduleItems.map((item) => (
                    <tr key={item.id} className="border-b border-white/10 last:border-none">
                      <td className="p-4 font-medium">{item.title}</td>
                      <td className="p-4 text-right">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden">
              <Image
                src="/image/KEGIATAN DO'A BERSAMA.jpeg"
                alt="PPDB Meeting"
                className="w-full h-48 md:h-64 object-cover"
                width={500}
                height={300}
              />
              <div className="p-4">
                <p className="text-sm leading-relaxed">
                  Mu&apos;allimin/ Madrasah Aliyah Persis Tarogong (Akreditasi A) adalah lembaga
                  pendidikan Islam terpadu setara SMA, yang memadukan kurikulum ke-Islaman khas
                  Pesantren Persatuan Islam dengan kurikulum pendidikan nasional. Lulusannya
                  diharapkan mampu mengembangkan dirinya menjadi &apos;Ulama/Zu&apos;ama.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <div className="text-center">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-lg transition-colors">
            DAFTAR SEKARANG
          </button>
        </div>
      </div>
    </div>
  );
}
