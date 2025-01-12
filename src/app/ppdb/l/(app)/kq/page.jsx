'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import LoadingState from './_components/LoadingState';
import StepItem from './_components/Stepper';
import DashboardPage from './_components/JenisDaftar';
import PaymentPage from './_components/layout/PaymentPage';
import RegistrationPage from './_components/layout/RegistrationPage';
import ValidationPage from './_components/layout/ValidationPage';
import ConfirmationPage from './_components/layout/ConfirmationPage';
import ErrorState from './_components/ErrorState';

const steps = [
  { id: 1, name: 'Registrasi Awal', status: 'registrasi', path: '/ppdb/register' },
  { id: 2, name: 'Pembayaran', status: 'proses', path: '/ppdb/payment' },
  { id: 3, name: 'Validasi', status: 'validasi', path: '/ppdb/validation' },
  { id: 4, name: 'Konfirmasi', status: 'konfirmasi', path: '/ppdb/confirmation' },
];

export default function Page() {
  const { data: session, status } = useSession();
  const [statusUser, setStatusUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ppdbData, setPpdbData] = useState(null);
  const [jenisPendaftaran, setJenisPedaftaran] = useState(null);
  const [error, setError] = useState('');
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = async () => {
    if (session?.user?.id && !dataFetched) {
      try {
        setIsLoading(true);
        const userResponse = await fetch(`/api/v1.0.0/auth/pendaftaran/${session.user.id}`, {
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
          },
        });
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setStatusUser(userData?.status || null);
        setPpdbData(userData);
        setJenisPedaftaran(userData?.jenisPendaftaran);
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

  const handleRefresh = () => {
    setDataFetched(false);
    fetchData();
  };

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="w-full bg-gray-50 p-4 relative">
      <div className="flex justify-end mb-6 absolute right-2"></div>
      <div className="max-w-4xl mx-auto flex md:flex-col rounded-md p-6">
        <div className="relative flex flex-col md:flex-row justify-between px-4 md:px-20">
          <div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-400 transform ftrans" />
          {steps.map((step) => (
            <StepItem key={step.id} step={step} currentStatus={statusUser} isLoading={isLoading} />
          ))}
        </div>
        <div className="mt-10 min-h-[70vh]">
          {status === 'loading' || isLoading ? (
            <LoadingState />
          ) : statusUser && jenisPendaftaran ? (
            <DaftarBaru
              status={statusUser}
              onRefresh={handleRefresh}
              ppdbData={ppdbData}
              id_user={session?.user?.id}
              jenisPendaftaran={jenisPendaftaran}
            />
          ) : (
            <DashboardPage
              setJenisPedaftaran={(value) => {
                setJenisPedaftaran(value);
                setStatusUser('registrasi');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DaftarBaru({ status, onRefresh, ppdbData, id_user, jenisPendaftaran }) {
  const commonProps = { onRefresh, ppdbData: ppdbData, id_user, jenisPendaftaran };
  switch (status) {
    case 'registrasi':
      return <RegistrationPage {...commonProps} />;
    case 'proses':
      return <PaymentPage {...commonProps} />;
    case 'validasi':
      return <ValidationPage />;
    case 'konfirmasi':
      return <ConfirmationPage />;
    default:
      return null;
  }
}
