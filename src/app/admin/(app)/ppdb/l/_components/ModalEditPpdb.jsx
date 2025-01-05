import React, { useState, useEffect } from 'react';
import {
  BookOpenIcon,
  CalendarIcon,
  CheckCircleIcon,
  DollarSignIcon,
  UserIcon,
} from 'lucide-react';

const fields = [
  { name: 'namaPPDB', label: 'Nama PPDB', placeholder: 'Masukkan nama PPDB', icon: UserIcon },
  {
    name: 'tahunAjaran',
    label: 'Tahun Ajaran',
    placeholder: 'Masukkan tahun ajaran',
    icon: CalendarIcon,
  },
  {
    name: 'biayaPendaftaran',
    label: 'Biaya Pendaftaran',
    placeholder: 'Masukkan biaya pendaftaran',
    icon: DollarSignIcon,
  },
  {
    name: 'biayaBulanan',
    label: 'Biaya Bulanan',
    placeholder: 'Masukkan biaya bulanan',
    icon: DollarSignIcon,
  },
  {
    name: 'biayaSeragam',
    label: 'Biaya Seragam',
    placeholder: 'Masukkan biaya seragam',
    icon: DollarSignIcon,
  },
  {
    name: 'jumlahKuota',
    label: 'Jumlah Kuota',
    placeholder: 'Masukkan jumlah kuota',
    icon: BookOpenIcon,
  },
];

export function ModalEditPPDB({ isOpen, onClose, ppdbData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    namaPPDB: '',
    tahunAjaran: '',
    biayaPendaftaran: '',
    biayaBulanan: '',
    biayaSeragam: '',
    jumlahKuota: '',
    status: '',
  });
  const [errors, setErrors] = useState({});
  const [showEndPPDBConfirmation, setShowEndPPDBConfirmation] = useState(false);
  const [isEndingPPDB, setIsEndingPPDB] = useState(false);

  useEffect(() => {
    if (ppdbData) {
      setFormData(ppdbData);
    }
  }, [ppdbData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.namaPPDB) newErrors.namaPPDB = 'Nama PPDB is required';
    if (!formData.tahunAjaran) newErrors.tahunAjaran = 'Tahun Ajaran is required';
    if (formData.biayaPendaftaran && parseFloat(formData.biayaPendaftaran) <= 0)
      newErrors.biayaPendaftaran = 'Biaya Pendaftaran must be positive';
    if (formData.biayaBulanan && parseFloat(formData.biayaBulanan) <= 0)
      newErrors.biayaBulanan = 'Biaya Bulanan must be positive';
    if (formData.biayaSeragam && parseFloat(formData.biayaSeragam) <= 0)
      newErrors.biayaSeragam = 'Biaya Seragam must be positive';
    if (formData.jumlahKuota && parseInt(formData.jumlahKuota) <= 0)
      newErrors.jumlahKuota = 'Jumlah Kuota must be a positive integer';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() && !isEndingPPDB) return;

    setIsLoading(true);
    const changedData = {};
    for (const key in formData) {
      if (formData[key] !== ppdbData[key]) {
        changedData[key] = formData[key];
      }
    }

    if (isEndingPPDB) {
      changedData.status = 'ditutup';
    }

    if (Object.keys(changedData).length === 0 && !isEndingPPDB) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/v1.0.0/auth/ppdb/${ppdbData.id_ppdb}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changedData),
      });

      if (response.ok) {
        onClose();
      } else {
        console.log(isEndingPPDB ? 'Failed to end PPDB' : 'Failed to update PPDB data');
      }
    } catch (error) {
      console.error('An unexpected error occurred', error);
    } finally {
      setIsLoading(false);
      setIsEndingPPDB(false);
      setShowEndPPDBConfirmation(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-[99] inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Update PPDB</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <field.icon className="h-4 w-4" />
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={
                  field.name.includes('biaya') || field.name === 'jumlahKuota' ? 'number' : 'text'
                }
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
              )}
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Update PPDB
            </button>
            {formData.status === 'dibuka' && (
              <button
                type="button"
                onClick={() => setShowEndPPDBConfirmation(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Akhiri PPDB
              </button>
            )}
          </div>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Tutup
        </button>
      </div>
      {showEndPPDBConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Akhiri PPDB?</h3>
            <p className="mb-4">
              Apakah Anda yakin ingin mengakhiri PPDB ini? Tindakan ini akan mengubah status menjadi
              &lsquo;ditutup&lsquo;.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowEndPPDBConfirmation(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setIsEndingPPDB(true);
                  handleSubmit(new Event('submit'));
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Ya, Akhiri PPDB
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
