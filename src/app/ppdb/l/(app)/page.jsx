'use client';

import React, { useEffect, useState } from 'react';
import ConfirmationModal from './_components/ModalConfirm';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoadingState from './kq/_components/LoadingState';

export default function WelcomePage({ nama }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusUser, setStatusUser] = useState(null);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();
  const fetchData = async () => {
    if (session?.user?.id && !dataFetched) {
      try {
        setIsLoading(true);
        const userResponse = await fetch(`/api/v1.0.0/auth/pendaftaran/${session.user.id}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        console.log('status : ', userData?.status);
        setStatusUser(userData?.status || null);
        setDataFetched(true);
      } catch (error) {
        console.error(error);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (session?.user?.id && !dataFetched) {
      fetchData();
    } else if (status !== 'loading') {
      setIsLoading(false);
    }
  }, [session?.user?.id, status, dataFetched]);
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
        {status === 'loading' || isLoading ? (
          <LoadingState />
        ) : statusUser ? (
          <p
            className="cursor-pointer font-bold text-xl text-blue-500"
            onClick={() => router.push('/ppdb/l/kq')}
          >
            Nama anda sudah terdaftar lihat progres
          </p>
        ) : (
          <button
            onClick={handleClick}
            className="mt-8 px-6 py-3 bg-[#F5B041] hover:bg-[#E59E2D] text-white rounded-md transition-colors duration-200 w-full md:w-auto text-center"
          >
            Klik disini untuk melakukan pendaftaran
          </button>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}
