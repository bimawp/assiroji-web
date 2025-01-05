'use client';

import {
  BookOpenIcon,
  CalendarIcon,
  CheckCircleIcon,
  DollarSignIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';

const PPDBSchema = z.object({
  namaPPDB: z.string().min(1, 'Nama PPDB is required'),
  tahunAjaran: z.string().min(1, 'Tahun Ajaran is required'),
  status: z.enum(['dibuka', 'ditutup']).default('dibuka'),
  biayaPendaftaran: z.number().positive('Biaya Pendaftaran must be positive'),
  biayaBulanan: z.number().positive('Biaya Bulanan must be positive'),
  biayaSeragam: z.number().positive('Biaya Seragam must be positive'),
  jumlahKuota: z.number().int().positive('Jumlah Kuota must be a positive integer').optional(),
});

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

export default function BuatPPDB() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    namaPPDB: '',
    tahunAjaran: '',
    status: 'dibuka',
    biayaPendaftaran: '',
    biayaBulanan: '',
    biayaSeragam: '',
    jumlahKuota: '',
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openConfirmationModal = (e) => {
    e.preventDefault();
    try {
      PPDBSchema.parse({
        ...formData,
        biayaPendaftaran: parseFloat(formData.biayaPendaftaran),
        biayaBulanan: parseFloat(formData.biayaBulanan),
        biayaSeragam: parseFloat(formData.biayaSeragam),
        jumlahKuota: formData.jumlahKuota ? parseInt(formData.jumlahKuota) : undefined,
      });
      setIsModalOpen(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      } else {
        console.error('An unexpected error occurred', error);
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const validatedData = PPDBSchema.parse({
        ...formData,
        biayaPendaftaran: parseFloat(formData.biayaPendaftaran),
        biayaBulanan: parseFloat(formData.biayaBulanan),
        biayaSeragam: parseFloat(formData.biayaSeragam),
        jumlahKuota: formData.jumlahKuota ? parseInt(formData.jumlahKuota) : undefined,
      });

      const response = await fetch('/api/v1.0.0/auth/ppdb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        setFormData({
          namaPPDB: '',
          tahunAjaran: '',
          status: 'dibuka',
          biayaPendaftaran: '',
          biayaBulanan: '',
          biayaSeragam: '',
          jumlahKuota: '',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      } else {
        console.error('An unexpected error occurred', error);
      }
    } finally {
      setIsLoading(false);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex w-full justify-between items-center bg-white border-b border-gray-200 p-4">
        <div className="flex gap-1 rounded-full bg-emerald-100 p-1">
          <Link href="/admin/ppdb/l" className={`rounded-full px-6 py-2 text-sm text-emerald-600`}>
            PPDB
          </Link>
          <div className={`rounded-full px-6 py-2 text-sm bg-emerald-600 text-white`}>
            Buat ppdb
          </div>
        </div>
      </div>

      <div className="w-full p-4">
        <div className="">
          <div className="mx-auto px-2 rounded-lg shadow">
            <h1 className="text-2xl font-bold  mb-6">Buat PPDB</h1>
            <form onSubmit={openConfirmationModal} className="space-y-6 mx-auto">
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
                      field.name.includes('biaya') || field.name === 'jumlahKuota'
                        ? 'number'
                        : 'text'
                    }
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F4D3D] focus:border-transparent"
                  />

                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-600">{errors[field.name][0]}</p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-[#1F4D3D] rounded-md hover:bg-[#2C7A5F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3D] focus:ring-offset-2"
              >
                Submit PPDB
              </button>
            </form>
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
              id="my-modal"
            >
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Konfirmasi Pengajuan PPDB
                  </h3>
                  <div className="mt-2 px-7 py-3">
                    <p className="text-sm text-gray-500">
                      Apakah Anda yakin ingin mengajukan PPDB ini?
                    </p>
                  </div>
                  <div className="items-center px-4 py-3">
                    <button
                      id="ok-btn"
                      className="px-4 py-2 bg-[#1F4D3D] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#2C7A5F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3D]"
                      disabled={isLoading}
                      onClick={handleSubmit}
                    >
                      Ya, Ajukan
                    </button>
                    <button
                      id="cancel-btn"
                      className="mt-3 px-4 py-2 bg-white text-[#1F4D3D] text-base font-medium rounded-md w-full shadow-sm border border-[#1F4D3D] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1F4D3D]"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
