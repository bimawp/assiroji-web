import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardPage({ setJenisPedaftaran }) {
  const router = useRouter();

  const [showRegistrationOptions, setShowRegistrationOptions] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const handleRegistrationChoice = (type) => {
    setShowRegistrationOptions(false);
    if (type === 'new') {
      setJenisPedaftaran('baru');
    } else if (type === 'reregister') {
      setJenisPedaftaran('ulang');
    }
  };

  return (
    <div className="min-h-[40vh] flex bg-gray-50">
      <div className="max-w-4xl h-full m-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleRegistrationChoice('new')}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Daftar Baru</h2>
            <p className="text-gray-600">Untuk pendaftar baru PPDB MA As-Siroji</p>
          </button>
          <button
            onClick={() => handleRegistrationChoice('reregister')}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Daftar Ulang</h2>
            <p className="text-gray-600">Untuk siswa yang ingin mendaftar ulang</p>
          </button>
        </div>
      </div>
    </div>
  );
}
