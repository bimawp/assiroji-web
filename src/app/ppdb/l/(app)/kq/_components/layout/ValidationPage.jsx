import Link from 'next/link';

export default function ValidationPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Validasi</h2>
      <p className="text-gray-600 mb-6">Tunggu validasi dari admin</p>

      {/* <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">KTP/Kartu Pelajar</label>
          <input
            type="file"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ijazah Terakhir</label>
          <input
            type="file"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between">
          <Link
            href="/payment"
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Kembali
          </Link>
          <Link
            href="/confirmation"
            className="px-6 py-2  text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500transition-colors"
          >
            Lanjutkan ke Konfirmasi
          </Link>
        </div>
      </form> */}
    </div>
  );
}
