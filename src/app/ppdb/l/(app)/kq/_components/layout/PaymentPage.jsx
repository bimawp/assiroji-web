import React, { useState } from 'react';

export default function PaymentPage({ onRefresh, ppdbData, id_user, fetching }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Halo, saya ${ppdbData?.dataUser?.namaLengkap} ingin mengirim bukti pembayaran untuk biaya penerimaan peserta didik baru . Mohon informasi lebih lanjut.`
    );
    window.open(`https://wa.me/${ppdbData.noWa}?text=${message}`, '_blank');
  };
  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-xl font-semibold mb-6">
            Biaya Pendaftaran Peserta Didik Baru TH {ppdbData?.tahunAjaran}
          </h1>

          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-600 w-40">Tanggal Transaksi</span>
                <span className="text-gray-600 px-2">:</span>
                <span className="font-medium">{ppdbData?.tanggalPendaftaran}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-40">Nama Lengkap</span>
                <span className="text-gray-600 px-2">:</span>
                <span className="font-medium">{ppdbData?.dataUser?.namaLengkap}</span>
              </div>

              {/* <div className="flex">
                <span className="text-gray-600 w-40">Penanggung Biaya</span>
                <span className="text-gray-600 px-2">:</span>
                <span className="font-medium">Ayah Kandung</span>
              </div> */}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-medium mb-4">Rincian</h2>
            <div className="space-y-2 border-b pb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Biaya Pendaftaran</span>
                <span className="font-medium">Rp {ppdbData?.biayaPendaftaran}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Biaya Bulanan</span>
                <span className="font-medium">Rp {ppdbData?.biayaBulanan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Biaya Seragam</span>
                <span className="font-medium">Rp {ppdbData?.biayaSeragam}</span>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                Rp{' '}
                {Number(ppdbData?.biayaPendaftaran) +
                  Number(ppdbData?.biayaBulanan) +
                  Number(ppdbData?.biayaSeragam)}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <button
              className="w-full py-2 text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 rounded"
              onClick={handleSubmit}
            >
              Lakukan pembayaran
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed z-[99] inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full">
            <h3 className="text-xl font-bold mb-4">Instruksi Pembayaran</h3>
            <div className="space-y-4">
              <p className="font-semibold">Nomor Rekening:</p>
              <ul className="list-disc list-inside pl-4">
                <li>BRI: {ppdbData.noRekBRI}</li>
              </ul>
              <p className="font-semibold mt-4">Instruksi Pengiriman Bukti Pembayaran:</p>
              <ol className="list-decimal list-inside pl-4">
                <li>Lakukan pembayaran ke salah satu nomor rekening di atas</li>
                <li>Ambil foto atau tangkapan layar bukti transfer</li>
                <li>
                  Kirim bukti pembayaran melalui WhatsApp dengan menyertakan nomor pesanan sebagai
                  referensi
                </li>
                <li>Tunggu konfirmasi dari tim kami untuk proses selanjutnya.</li>
              </ol>
              <button
                onClick={openWhatsApp}
                className="w-full mt-4 px-6 py-2 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded"
              >
                Kirim Bukti via WhatsApp
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
