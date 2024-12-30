'use client';
import ImageUploader from '@/components/__DropImageInput';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { addGuru, updateGuru } from './actions';

export default function AddEditGuruModal({ isOpen, onClose, onSave, guru = null }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    imageUrl: '',
  });
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (guru) {
      setFormData({ ...guru, imageUrl: guru.itemImage });
    } else {
      setFormData({
        name: '',
        position: '',
        imageUrl: '',
      });
    }
  }, [guru]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, imageUrl, itemImage: file });
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
      if (guru) {
        await updateGuru(submitFormData, session.user.access_token, formData['id_guru']);
      } else {
        await addGuru(submitFormData, session.user.access_token);
      }
      router.refresh();
      onClose();
    } catch (error) {
      console.error('Error submitting guru:', error);
    } finally {
      setIsSubmitting(false);
      onSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-[23] inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">{guru ? 'Edit' : 'Add'} Guru</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <ImageUploader onImageUpload={handleImageUpload} initialState={formData.imageUrl} />
          </div>
          {/* <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">Active</span>
            </label>
          </div> */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-3"
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
              ) : guru ? (
                'Update'
              ) : (
                'Add'
              )}
              Pegawai
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
