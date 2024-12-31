'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function EditPPDBModal({ ppdb, isOpen, onClose, onSave }) {
  const [statusPendaftaran, setStatusPendaftaran] = useState('proses');
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (ppdb) {
      setStatusPendaftaran(ppdb.statusPendaftaran);
    } else {
      setStatusPendaftaran('proses');
    }
  }, [ppdb]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/v1.0.0/auth/pendaftaran/${ppdb.id_data_pendaftar}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify({ statusPendaftaran }),
      });

      if (!response.ok) {
        throw new Error('Failed to update PPDB');
      }

      router.refresh();
      onClose();
      onSave();
    } catch (error) {
      console.error('Error submitting PPDB:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = ppdb.user.formulirPendaftaran.noTelepon;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">Edit PPDB</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">No telepon</p>
              <div className="flex items-center justify-between">
                <p className="w-full p-2">{ppdb.user.formulirPendaftaran.noTelepon}</p>
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Hubungi
                </button>
              </div>
            </div>
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</p>
              <p className="w-full p-2">{ppdb.user.formulirPendaftaran.alamatLengkap}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Pendaftaran
              </label>
              <select
                value={statusPendaftaran}
                onChange={(e) => setStatusPendaftaran(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#039786]"
              >
                <option value="proses">Proses</option>
                <option value="diterima">Diterima</option>
                <option value="ditolak">Ditolak</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 flex items-center justify-center bg-[#039786] text-white rounded-md hover:bg-emerald-600 gap-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                'Update PPDB'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
