'use client';

import { ClipboardList, Settings, UserPlus, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ModalEditPPDB } from './_components/ModalEditPpdb';

export default function KelolaPPDB() {
  const router = useRouter();
  const [currentPPDB, setCurrentPPDB] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPPDBData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1.0.0/auth/ppdb');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const ppdb = await response.json();
      setCurrentPPDB(ppdb);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = async () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchPPDBData();
  }, []);

  return (
    <>
      <ModalEditPPDB
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ppdbData={currentPPDB || ''}
        onReset={() => router.refresh()}
      />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-3">
            <h1 className="text-2xl font-semibold text-[#1D564F]">Kelola PPDB</h1>
          </div>
        </div>

        <div className="flex-1 overflow-auto min-h-[94vh] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                <SummaryCard
                  title="Total Pendaftar"
                  value={currentPPDB?.totalPendaftar || 0}
                  icon="👥"
                  color="blue"
                />
                <SummaryCard
                  title="Belum Divalidasi"
                  value={currentPPDB?.belumDiKonfirmasi || 0}
                  icon="⏳"
                  color="yellow"
                />
                <SummaryCard
                  title="Lolos Seleksi"
                  value={currentPPDB?.sudahDiKonfirmasi || 0}
                  icon="✅"
                  color="green"
                />
              </>
            )}
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {isLoading ? (
                  <>
                    <SkeletonButton />
                    <SkeletonButton />
                    <SkeletonButton />
                    <SkeletonButton />
                  </>
                ) : currentPPDB ? (
                  <>
                    <QuickActionButton
                      title="Validasi Pendaftar"
                      icon={<ClipboardList className="w-6 h-6" />}
                      onClick={() => router.push('/admin/ppdb/seleksi-ppdb')}
                    />
                    <QuickActionButton
                      title="Lihat Semua Pendaftar"
                      icon={<Users className="w-6 h-6" />}
                      onClick={() => router.push('/admin/ppdb/l/pendaftar-masuk')}
                    />
                    <QuickActionButton
                      title="Pengaturan PPDB"
                      icon={<Settings className="w-6 h-6" />}
                      onClick={() => openModal()}
                    />
                  </>
                ) : (
                  <QuickActionButton
                    title="Buat PPDB Baru"
                    icon={<UserPlus className="w-6 h-6" />}
                    onClick={() => router.push('/admin/ppdb/l/buat-ppdb')}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Detail PPDB Saat Ini</h2>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <SkeletonDetail />
                  <SkeletonDetail />
                  <SkeletonDetail />
                  <SkeletonDetail />
                  <SkeletonDetail />
                  <SkeletonDetail />
                  <SkeletonDetail />
                </div>
              ) : currentPPDB ? (
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
              ) : (
                <p className="text-center">Belum ada PPDB</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
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

function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="ml-4 flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

function SkeletonButton() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg animate-pulse">
      <div className="w-6 h-6 bg-gray-200 rounded-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  );
}

function SkeletonDetail() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    </div>
  );
}
