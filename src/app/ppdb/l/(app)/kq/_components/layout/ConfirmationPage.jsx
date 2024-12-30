import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 text-center">
      <div className="mb-6">
        <svg
          className="mx-auto h-16 w-16 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold mb-4">Pendaftaran Berhasil!</h2>
      <p className="text-gray-600 mb-8">
        Terima kasih telah mendaftar di PPDB MA As-Siroji. Kami akan mengirimkan email konfirmasi
        dengan detail lebih lanjut.
      </p>

      <Link
        href="/registration"
        className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
