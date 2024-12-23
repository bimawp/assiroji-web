import Header from '@/components/__Header';
import Image from 'next/image';

export default function sejarahPage() {
  return (
    <div className="bg-gradient-to-b from-teal-200 to-teal-400 p-4 md:p-0 text-black">
      <Header
        h1Content="Sejarah"
        subtitle="Perjalanan Panjang Menuju Keunggulan"
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
            <p className="leading-relaxed">
              Pondok Pesantren Badrul Ulum AL-Islami pada awal mulanya berama Pondok Pesantren
              SINAPEUL, didirikan pertama kali oleh (alm.) KH. Amin Siroj pada tahun 1918. Dengan
              demikian,Pondok Pesantren ini telah berusia lebih dari 100 tahun (1 abad).Sepeninggal
              Muassis Awwal (alm.) KH. Amin Siroj pada tahun 1973, Pondok Pesantren SINAPEUL
              dilanjutkan oleh putera sulungnya yaitu (alm. KH. Hasbullah, Pondok Pesantren SINAPEUL
              selanjutnya dikelola oleh salah seorang cucu dari (alm.) KH. Amin Siroj, yaitu KH.
              Masluh Sakandan putera ke-2 dari pasangan KH. Ahmad dan (almh.) HJ. Oom Rohmah, dan
              dibantu oleh sanak saudara, keluarga. serta cucu dari keluarga besar Pondok Pesantren
              SINAPEUL lainnya.
            </p>
            <p className="leading-relaxed">
              Atas kesepakatan dan persetujuan dari seluruh pihak keluarga besar beserta para alumni
              senior angkatan pertama pondok pesantren SINAPEUL, pada tahun yang sama tahun 1993 M /
              1414 H,Pondok Pesantren SINAPEUL selanjutnya berganti nama menjadi Pondok Pesantren
              Badrul Ulum AH-Islami dan resmi berbadan hukum dengan terbentuknya Yayasan Pondok
              Pesantren Badrul Ulum Al-Islami pada tahun 1998.
            </p>
            <p className="leading-relaxed">
              Pada tahun ajaran 2019-2020, Yayasan Pondok Pesantren Badrul Ulum Al-Islami membuka
              cabang Pondok Pesantren dengan berbasis teknologi informasi qurani (TIQ) yaitu Lembaga
              Pendidikan Modern (LPM) WADIL QURO.Sekolah Menengah Pertama (SMP) AS-SIROJI dan
              Madrasah Aliyah (MA) AS-SIROJI yang masing-masing telah berstatus &quot; terakreditasi
              &quot; adalah di antara lembaga pendidikan formal sekolah yang berada di bawah
              pengelolaan Yayasan Pondok Pesantren Badrul Ulum Al-Islami, yang mewajilbkan setiap
              siswa/i nya mengikuti program pendidikan di pondok pesantren. Dan di antara lembaga
              pendidikan formal lainnya adalah SMP Plus Multazam dan TK Baiturrosyad yang sama-sama
              telah berstatus &quot; terakreditasi &quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
