import Image from 'next/image';

export default function PrestasiPage() {
  const achievements = [
    {
      id: 1,
      title: 'Juara 4 Kompetensi Sains Madrasah',
      subtitle: 'Mata Pelajaran Ekonomi tingkat provinsi Jawa Barat',
      image: "/image/KEGIATAN DO'A BERSAMA.jpeg",
      description:
        'Alhamdulillah, kabar baik datang dari Madrasah Aliyah (MA) kita! Dengan penuh rasa syukur dan bangga, kami sampaikan bahwa Madrasah Aliyah [Nama Sekolah] berhasil meraih JUARA 4 Kompetisi Sains Madrasah (KSM) untuk Mata Pelajaran Ekonomi tingkat Provinsi Jawa Barat. Selengkapnya...',
    },
    {
      id: 2,
      title: 'Juara 4 Kompetensi Sains Madrasah',
      subtitle: 'Mata Pelajaran Ekonomi tingkat provinsi Jawa Barat',
      image: "/image/KEGIATAN DO'A BERSAMA.jpeg",
      description:
        'Alhamdulillah, kabar baik datang dari Madrasah Aliyah (MA) kita! Dengan penuh rasa syukur dan bangga, kami sampaikan bahwa Madrasah Aliyah [Nama Sekolah] berhasil meraih JUARA 4 Kompetisi Sains Madrasah (KSM) untuk Mata Pelajaran Ekonomi tingkat Provinsi Jawa Barat.',
    },
  ];
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
          <h1 className="text-2xl font-bold">PRESTASI</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto py-5">
        <div className="space-y-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <Image
                      src={achievement.image}
                      alt={achievement.title}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-2/3 space-y-3">
                    <h2 className="text-xl font-semibold">{achievement.title}</h2>
                    <h3 className="text-lg font-medium">{achievement.subtitle}</h3>
                    <p className="text-sm leading-relaxed">{achievement.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6">
          <p className="text-sm leading-relaxed">
            Prestasi ini menjadi bukti nyata dari kerja keras siswa, dukungan guru, serta doa dari
            seluruh warga madrasah. Semoga keberhasilan ini menjadi motivasi untuk terus berprestasi
            dan membawa nama baik madrasah ke tingkat yang lebih tinggi.
          </p>
          <p className="text-sm mt-4">
            Terima kasih atas doa dan dukungan semua pihak. Mari kita terus berjuang bersama untuk
            menggapai prestasi di masa depan!
          </p>
        </div>
      </div>
    </div>
  );
}
