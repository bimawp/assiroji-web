'use client';

import { ClipboardList, Settings, UserPlus, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function KelolaPPDB() {
  const [currentPPDB, setCurrentPPDB] = useState(null);
  const [registrationStats, setRegistrationStats] = useState({
    total: 0,
    unvalidated: 0,
    accepted: 0,
  });

  useEffect(() => {
    setCurrentPPDB({
      namaPPDB: 'PPDB 2024/2025',
      tahunAjaran: '2024/2025',
      status: 'dibuka',
      biayaPendaftaran: 500000,
      biayaBulanan: 750000,
      biayaSeragam: 1000000,
      jumlahKuota: 100,
    });
    setRegistrationStats({
      total: 75,
      unvalidated: 25,
      accepted: 40,
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-100">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <h1 className="text-2xl font-semibold text-[#1D564F]">Kelola PPDB</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto min-h-[94vh] p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <SummaryCard
            title="Total Pendaftar"
            value={registrationStats.total}
            icon="👥"
            color="blue"
          />
          <SummaryCard
            title="Belum Divalidasi"
            value={registrationStats.unvalidated}
            icon="⏳"
            color="yellow"
          />
          <SummaryCard
            title="Lolos Seleksi"
            value={registrationStats.accepted}
            icon="✅"
            color="green"
          />
          <SummaryCard
            title="Kuota Tersisa"
            value={currentPPDB ? currentPPDB.jumlahKuota - registrationStats.accepted : 0}
            icon="🎟️"
            color="purple"
          />
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickActionButton
                title="Validasi Pendaftar"
                icon={<ClipboardList className="w-6 h-6" />}
              />
              <QuickActionButton
                title="Lihat Semua Pendaftar"
                icon={<Users className="w-6 h-6" />}
              />
              <QuickActionButton title="Pengaturan PPDB" icon={<Settings className="w-6 h-6" />} />
              {!currentPPDB && (
                <QuickActionButton
                  title="Buat PPDB Baru"
                  icon={<UserPlus className="w-6 h-6" />}
                  onClick={() => alert('oke')}
                />
              )}
            </div>
          </div>
        </div>

        {currentPPDB && (
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Detail PPDB Saat Ini</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailItem label="Nama PPDB" value={currentPPDB.namaPPDB} />
                <DetailItem label="Tahun Ajaran" value={currentPPDB.tahunAjaran} />
                <DetailItem label="Status" value={currentPPDB.status} />
                <DetailItem
                  label="Biaya Pendaftaran"
                  value={`Rp ${currentPPDB.biayaPendaftaran.toLocaleString()}`}
                />
                <DetailItem
                  label="Biaya Bulanan"
                  value={`Rp ${currentPPDB.biayaBulanan.toLocaleString()}`}
                />
                <DetailItem
                  label="Biaya Seragam"
                  value={`Rp ${currentPPDB.biayaSeragam.toLocaleString()}`}
                />
                <DetailItem label="Jumlah Kuota" value={currentPPDB.jumlahKuota} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="ml-4">
          <h2 className="text-gray-600 text-sm">{title}</h2>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ title, icon, onClick }) {
  return (
    <button
      className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
      onClick={onClick}
    >
      <div className="text-[#1D564F] group-hover:text-[#16453F] mb-2">{icon}</div>
      <span className="text-sm text-[#1D564F] font-medium group-hover:text-[#16453F] text-center">
        {title}
      </span>
    </button>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-lg font-medium text-gray-800">{value}</span>
    </div>
  );
}
