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
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return date.toLocaleString('id-ID', options);
}

export function formatTanggalArtikel(createdAt) {
  const date = new Date(createdAt);

  const options = {
    timeZone: 'Asia/Jakarta',
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  // Format tanggal dengan lokal Indonesia
  return new Intl.DateTimeFormat('id-ID', options).format(date);
}
