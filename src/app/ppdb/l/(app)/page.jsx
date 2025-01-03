'use client';

import { useState } from 'react';
import ConfirmationModal from './_components/ModalConfirm';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function WelcomePage({ nama }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    router.push('/ppdb/l/kq');
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-[87vh] bg-[#E0EEE9] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Selamat Datang{session?.user?.name ? `, ${session?.user?.name}` : ''}
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Senang sekali bisa bergabung di PPDB MA As-Siroji
        </p>
        <button
          onClick={handleClick}
          className="mt-8 px-6 py-3 bg-[#F5B041] hover:bg-[#E59E2D] text-white rounded-md transition-colors duration-200 w-full md:w-auto text-center"
        >
          Klik disini untuk melakukan pendaftaran
        </button>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}
