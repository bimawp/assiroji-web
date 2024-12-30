'use client';
import React, { useState } from 'react';
import { ArrowUpDown, Eye, Plus, RefreshCw } from 'lucide-react';
import GalleryCard from './GalleryCard';
import PreviewModal from './PreviewModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import AddEditGalleryModal from './AddEditGalleryModal';

export default function Dashboard({ gallery, setGallery, onRefresh }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [filterActive, setFilterActive] = useState('all');
  const [hasChanges, setHasChanges] = useState(false);

  const handleAddgallery = (newgallery) => {
    setGallery([...gallery, { ...newgallery, id: Date.now() }]);
    setHasChanges(true);
  };

  const handleEditgallery = (updatedgallery) => {
    setGallery(
      gallery.map((gallery) => (gallery.id === updatedgallery.id ? updatedgallery : gallery))
    );
    setHasChanges(true);
  };

  const handleDeletegallery = (id) => {
    setGallery(gallery.filter((gallery) => gallery.id !== id));
    setHasChanges(true);
  };

  const handleSort = () => {
    const newSortBy = sortBy === 'caption' ? 'date' : 'caption';
    setSortBy(newSortBy);
    setGallery(
      [...gallery].sort((a, b) =>
        newSortBy === 'caption' ? a.caption.localeCompare(b.caption) : b.id - a.id
      )
    );
    setHasChanges(true);
  };

  const filteredgallery = gallery.filter(
    (gallery) => filterActive === 'all' || gallery.isActive === (filterActive === 'active')
  );

  return (
    <div className="p-3">
      <div className="flex w-full justify-between items-center pb-4">
        <h1 className="text-xl font-semibold mb-4">Gallery</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="inline-block mr-2 h-4 w-4" />
            Add Gallery
          </button>
          {/* <button
            onClick={handleSort}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <ArrowUpDown className="inline-block mr-2 h-4 w-4" />
            Sort by {sortBy === 'name' ? 'Date' : 'Name'}
          </button>
          <select
            onChange={(e) => {
              setFilterActive(e.target.value);
              setHasChanges(true);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <option value="all">All gallery</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select> */}
        </div>
      </div>
      <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredgallery.map((gallery) => (
          <GalleryCard
            key={gallery['id_gallery']}
            gallery={gallery}
            onEdit={() => {
              setCurrentGallery(gallery);
              setIsEditModalOpen(true);
            }}
            onDelete={() => {
              setCurrentGallery(gallery);
              setIsDeleteModalOpen(true);
            }}
            onToggleActive={() => {
              handleEditgallery({ ...gallery, isActive: !gallery.isActive });
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setIsPreviewModalOpen(true)}
          className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview Landing Page
        </button>
        {/* <button
          onClick={() => {
            // Di sini Anda akan menambahkan logika untuk menyimpan perubahan ke backend
            setHasChanges(false);
            alert('Changes saved to landing page!');
          }}
          className={`px-6 py-2  text-white rounded-lg  transition-colors inline-flex items-center ${
            hasChanges
              ? 'bg-gray-900 hover:bg-gray-800 focus:ring-blue-500'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!hasChanges}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          save changes
        </button> */}
      </div>
      <AddEditGalleryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddgallery}
        onRefresh={onRefresh}
      />
      <AddEditGalleryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditgallery}
        gallery={currentGallery}
        onRefresh={onRefresh}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          handleDeletegallery(currentGallery.id);
          setIsDeleteModalOpen(false);
        }}
        galleryName={currentGallery?.name}
      />
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        galleries={gallery}
      />
    </div>
  );
}
