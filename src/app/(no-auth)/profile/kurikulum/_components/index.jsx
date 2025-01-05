import Header from '@/components/__Header';
import Image from 'next/image';

export default function KurikulumPage({ data }) {
  return (
    <div className="bg-gradient-to-b from-teal-200 to-teal-400 p-4 md:p-0 text-black">
      <Header
        h1Content="Kurikulum"
        subtitle="Fondasi Pembelajaran untuk Kesuksesan"
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
          <div className="space-y-6 text-justify">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: data.deskripsi }}
            />
            {/* <p className="leading-relaxed"> 
             Pada tahun 2016, sekolah ini menggunakan Kurikulum 2013. Mulai tahun 2019, sekolah ini
              mencoba untuk menggunakan sistem kredit semester (SKS) yang telah disempurnakan untuk
              memenuhi kebutuhan yang diperlukan dengan memanfaatkan TIK sehingga kami menjadi
              sekolah berbasis TIK. Hal ini menandakan bahwa SMA Negeri 1 Bandung adalah sekolah
              pertama di Jawa Barat yang menggunakan sistem kredit semester berbasis TIK.
            </p>

            <p className="leading-relaxed">
              SMA Negeri 1 Bandung sebagai sekolah rujukan bagi sekolah-sekolah imbas sekitarnya.
              Tahun 2019 SMA Negeri 1 Bandung juga menjadi Sekolah Integritas dengan motto
              &quot;SMANSA INTEGRITAS BERSATU&quot;. Sekolah Ramah Anak, dan sebagai Sekolah
              Berbasis TIK yang memanfaatkan teknologi sebagai kebutuhan kegiatan pembelajaran.
            </p>

            <p className="leading-relaxed">
              Sejak Tahun Pelajaran 2022-2023, SMA Negeri 1 Bandung mempersiapkan diri untuk
              melaksanakan Program Sekolah Penggerak yang berfokus pada pengembangan hasil belajar
              siswa secara holistik dengan mewujudkan Profil Pelajar Pancasila yang mencakup
              kompetensi dan karakter yang diawali dengan SDM yang unggul (kepala sekolah dan guru).
              Dengan demikian saat ini SMA Negeri 1 Bandung menggunakan Kurikulum Merdeka untuk
              Kelas X.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
