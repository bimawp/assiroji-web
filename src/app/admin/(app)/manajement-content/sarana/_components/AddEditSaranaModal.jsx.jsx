'use client';
import ImageUploader from '@/components/__DropImageInput';
import React, { useState, useEffect } from 'react';

export default function AddEditSaranaModal({ sarana, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    namaBangunan: '',
    jumlah: '',
    volume: '',
    kondisi: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (sarana) {
      setFormData(sarana);
    } else {
      setFormData({
        namaBangunan: '',
        jumlah: '',
        volume: '',
        kondisi: '',
        imageUrl: '',
      });
    }
  }, [sarana]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;
  const handleImageUpload = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: file,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">{sarana ? 'Edit Sarana' : 'Tambah Sarana'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Bangunan</label>
              <input
                type="text"
                name="namaBangunan"
                value={formData.namaBangunan}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#039786]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
              <input
                type="number"
                name="jumlah"
                value={formData.jumlah}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#039786]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Volume (m²)</label>
              <input
                type="number"
                name="volume"
                value={formData.volume}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#039786]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kondisi</label>
              <select
                name="kondisi"
                value={formData.kondisi}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto bangunan</label>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#039786] text-white rounded-md hover:bg-emerald-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
