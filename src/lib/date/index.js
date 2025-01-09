export default function formatToIndonesianDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
export function formatTanggal(isoDateString) {
  const date = new Date(isoDateString);

  const options = {
    weekday: 'long', // Menampilkan hari (Senin, Selasa, dll.)
    day: '2-digit', // Menampilkan tanggal
    month: 'long', // Menampilkan bulan dalam nama lengkap
    year: 'numeric', // Menampilkan tahun
    hour: '2-digit', // Menampilkan jam
    minute: '2-digit', // Menampilkan menit
    second: '2-digit', // Menampilkan detik
  };

  // Menggunakan toLocaleString dengan locale 'id-ID' untuk format Indonesia
  return date.toLocaleString('id-ID', options);
}
