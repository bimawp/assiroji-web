import Header from '@/components/__Header';
import Image from 'next/image';
import PagePrestasiLanding from './_components';

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
export const dynamic = 'force-dynamic';
export default async function PrestasiPage() {
  try {
    const ress = await fetch('api/v1.0.0/auth/prestasi', {
      cache: 'no-store',
    });
    if (!ress) {
      notFound();
    }
    const prestasi = await ress.json();

    return <PagePrestasiLanding data={prestasi} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
