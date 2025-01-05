'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { BookOpenIcon, CalendarIcon, DollarSignIcon, UserIcon } from 'lucide-react';
import ImageUploader from '@/components/__DropImageInput';

const PPDBSchema = z.object({
  namaPPDB: z.string().min(1, 'Nama PPDB is required'),
  tahunAjaran: z.string().min(1, 'Tahun Ajaran is required'),
  status: z.enum(['dibuka', 'ditutup']).default('dibuka'),
  biayaPendaftaran: z.number().positive('Biaya Pendaftaran must be positive'),
  biayaBulanan: z.number().positive('Biaya Bulanan must be positive'),
  biayaSeragam: z.number().positive('Biaya Seragam must be positive'),
  jumlahKuota: z.number().int().positive('Jumlah Kuota must be a positive integer').optional(),
  noWa: z.string().min(1, 'Nomor WhatsApp is required'),
  noRekBRI: z.string().min(1, 'Nomor Rekening BRI is required'),
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
  { name: 'noWa', label: 'Nomor WhatsApp', placeholder: 'Masukkan nomor WhatsApp', icon: UserIcon },
  {
    name: 'noRekBRI',
    label: 'Nomor Rekening BRI',
    placeholder: 'Masukkan nomor rekening BRI',
    icon: DollarSignIcon,
  },
];

export default function PPDBForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    namaPPDB: '',
    tahunAjaran: '',
    status: 'dibuka',
    biayaPendaftaran: '',
    biayaBulanan: '',
    biayaSeragam: '',
    jumlahKuota: '',
    noWa: '',
    noRekBRI: '',
  });
  const [errors, setErrors] = useState({});
  const [brosur, setBrosur] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (file) => {
    setBrosur(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const validatedData = PPDBSchema.parse({
        ...formData,
        biayaPendaftaran: parseFloat(formData.biayaPendaftaran),
        biayaBulanan: parseFloat(formData.biayaBulanan),
        biayaSeragam: parseFloat(formData.biayaSeragam),
        jumlahKuota: formData.jumlahKuota ? parseInt(formData.jumlahKuota) : undefined,
      });

      const formDataToSend = new FormData();
      Object.entries(validatedData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (brosur) {
        formDataToSend.append('brosur', brosur);
      }

      const response = await fetch('/api/v1.0.0/auth/ppdb', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      });

      if (response.ok) {
        router.push('/admin/ppdb/l');
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
  };

  return (
    <div className="w-full p-4">
      <div className="mx-auto px-2 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Buat PPDB</h1>
        <form onSubmit={handleSubmit} className="space-y-6 mx-auto">
          <ImageUploader onImageUpload={handleImageUpload} />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F4D3D] focus:border-transparent"
              />
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">{errors[field.name][0]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-[#1F4D3D] rounded-md hover:bg-[#2C7A5F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3D] focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : 'Submit PPDB'}
          </button>
        </form>
      </div>
    </div>
  );
}
