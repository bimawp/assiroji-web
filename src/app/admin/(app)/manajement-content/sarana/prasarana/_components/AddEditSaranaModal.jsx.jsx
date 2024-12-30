'use client';
import ImageUploader from '@/components/__DropImageInput';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { addSarana, updateSarana } from './actions';

export default function AddEditSaranaModal({ prasarana, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    condition: '',
  });
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (prasarana) {
      setFormData({ ...prasarana, imageUrl: prasarana.itemImage });
    } else {
      setFormData({
        name: '',
        quantity: '',
        condition: '',
      });
    }
  }, [prasarana]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'imageUrl' && key !== 'id') {
        submitFormData.append(key, formData[key]);
      }
    });

    try {
      if (prasarana) {
        await updateSarana(submitFormData, session.user.access_token, formData['id_prasarana']);
      } else {
        await addSarana(submitFormData, session.user.access_token);
      }
      router.refresh();
      onClose();
    } catch (error) {
      console.error('Error submitting prasarana:', error);
    } finally {
      onSave();
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">{prasarana ? 'Edit Sarana' : 'Tambah Sarana'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Prasarana</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#039786]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#039786]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kondisi</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#039786]"
                required
              >
                <option value="">Pilih Kondisi</option>
                <option value="1">Baik</option>
                <option value="2">Rusak Ringan</option>
                <option value="3">Rusak Berat</option>
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
              ) : prasarana ? (
                'Update'
              ) : (
                'Add'
              )}
              Sarana
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
