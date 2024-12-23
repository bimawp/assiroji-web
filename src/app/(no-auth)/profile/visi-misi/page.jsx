import Header from '@/components/__Header';
import Image from 'next/image';

export default function visiMisiPage() {
  return (
    <div className="bg-gradient-to-b from-teal-200 to-teal-400 p-4 md:p-0 text-black">
      <Header
        h1Content="Visi dan Misi"
        subtitle="Arah dan Tujuan Pendidikan Kami"
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
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">VISI</h2>
              <p className="text-lg font-medium text-center px-4">
                &quot;TERWUJUDNYA WARGA MADRASAH YANG AGAMIS, AKTIF, KREATIF DAN BERPRESTASI.&quot;
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">MISI</h2>
              <ol className="list-decimal list-inside space-y-3">
                <li>Membangun lingkungan pendidikan yang Islami.</li>
                <li>Mengembangkan sikap positif terhadap ajaran agama islam</li>
                <li>Ikut serta dalam berbagai kegiatan akademik organisasi profesi kesiswaan</li>
                <li>
                  Memiliki kepekaan terhadap berbagai fenomena akademik, organisasi kesiswaan dan
                  sosial.
                </li>
                <li>
                  Mengembangkan model dan metode pembelajaran sesuai dengan perkembangan ilmu
                  pengetahuan dan teknologi.
                </li>
                <li>Mengembangkan ide dalam meningkatkan kualitas manajerial.</li>
                <li>
                  Memberdayakan 7 K ( kebersihan, ketertiban, keindahan, kenyamanan, keamanan, dan
                  kedisiplinan ) dilingkungan madrasah
                </li>
                <li>
                  Menghasilkan lulusan yang berkualitas dan kompetitif sehingga mampu melanjutkan ke
                  jenjang pendidikan yang lebih tinggi.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">TUJUAN MA AS-SIROJI</h2>
              <ol className="list-decimal list-inside space-y-3">
                <li>Mengembangkan budaya Madrasah yang Islami</li>
                <li>
                  Meningkatkan kecerdasan, pengetahuan, kepribadian, akhlak mulia, serta
                  keterampilan peserta didik untuk hidup mandiri dan mengikuti pendidikan lebih
                  lanjut sesuai dengan programnya.
                </li>
                <li>
                  Membekali peserta didik dengan ilmu agama, ilmu pengetahuan, teknologi, seni dan
                  budaya agar mampu mengembangkan diri baik melalui jenjang pendidikan yang lebih
                  tinggi maupun di dunia kerja
                </li>
                <li>
                  Mencetak lulusan yang beriman dan bertaqwa kepada Tuhan YME, berbudi luhur,
                  berkepribadian mandiri, tangguh, cerdas, kreatif, terampil, disiplin, beretos
                  kerja, profesional, bertanggung jawab, produktif, sehat rohani dan jasmani.
                  Memiliki semangat kebangsaan, cinta tanah air, kesetaraan sosial, kesadaran akan
                  sejarah bangsa dan sikap menghargai pahlawan serta berorientasi masa depan.
                </li>
                <li>
                  Unggul dalam kegiatan keagamaan dan kepedulian sosial, dalam penerapan ilmu
                  pengetahuan dan teknologi, dalam berkhalaqul karimah, dalam kesehatan dan
                  pengabdian
                </li>
                <li>
                  Optimalisasi dalam pengembangan diri dan minat dan bakat siswa melalui program
                  Bimbingan dan konseling dan ekstrakurikuler ( kaligafi, pramuka, drumband, dll )
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
