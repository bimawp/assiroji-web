'use client';
import ImageUploader from '@/components/__DropImageInput';
import React, { useEffect, useState } from 'react';

export default function AddEditGalleryModal({ isOpen, onClose, onSave, gallery = null }) {
  const [formData, setFormData] = useState({
    name: '',
    caption: '',
    imageUrl: '',
    isActive: true,
  });

  useEffect(() => {
    if (gallery) {
      setFormData(gallery);
    } else {
      setFormData({
        caption: '',
        imageUrl: '',
        isActive: true,
      });
    }
  }, [gallery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, imageUrl });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">{gallery ? 'Edit' : 'Add'} gallery</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
              caption
            </label>
            <textarea
              id="caption"
              name="caption"
              value={formData.caption}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <ImageUploader onImageUpload={handleImageUpload} initialState={formData.imageUrl} />
          </div>
          <div className="mb-4">
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
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {gallery ? 'Update' : 'Add'} gallery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
