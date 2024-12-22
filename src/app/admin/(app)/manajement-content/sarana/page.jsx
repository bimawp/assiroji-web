'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, PlusIcon, Search } from 'lucide-react';
import PreviewModal from './_components/PreviewModal.jsx';
import AddEditSaranaModal from './_components/AddEditSaranaModal.jsx.jsx';
import ConfirmDeleteModal from './_components/ConfirmDeleteModal.jsx';

export default function Page() {
  const [sarana, setSaranas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedSarana, setSelectedSarana] = useState(null);

  useEffect(() => {
    fetchSaranas();
  }, []);

  const fetchSaranas = async () => {
    setIsLoading(true);
    try {
      // Simulasi delay API dengan setTimeout
      setTimeout(() => {
        const dummyData = [
          {
            'id-bangunan': 'B001',
            namaBangunan: 'Gedung Olahraga',
            jumlah: 3,
            volume: '200 m²',
            kondisi: 'Baik',
            imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
          },
          {
            'id-bangunan': 'B002',
            namaBangunan: 'Perpustakaan',
            jumlah: 1,
            volume: '150 m²',
            kondisi: 'Cukup',
            imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
          },
          {
            'id-bangunan': 'B003',
            namaBangunan: 'Laboratorium',
            jumlah: 2,
            volume: '120 m²',
            kondisi: 'Baik',
            imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
          },
          {
            'id-bangunan': 'B004',
            namaBangunan: 'Kantin',
            jumlah: 1,
            volume: '80 m²',
            kondisi: 'Kurang Baik',
            imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
          },
          {
            'id-bangunan': 'B005',
            namaBangunan: 'Ruang Kelas',
            jumlah: 10,
            volume: '300 m²',
            kondisi: 'Baik',
            imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
          },
          {
            'id-bangunan': 'B006',
            namaBangunan: 'Aula',
            jumlah: 1,
            volume: '250 m²',
            kondisi: 'Cukup',
            imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
          },
        ];
        setSaranas(dummyData);
        setIsLoading(false);
      }, 1500); // Delay 1.5 detik
    } catch (error) {
      console.error('Error fetching sarana:', error);
      setIsLoading(false);
    }
  };

  const filteredSaranas = sarana.filter((sarana) =>
    sarana.namaBangunan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSaranas = filteredSaranas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredSaranas.length / itemsPerPage);

  const handleAddSarana = () => {
    setSelectedSarana(null);
    setIsAddEditModalOpen(true);
  };

  const handleEditSarana = (sarana) => {
    setSelectedSarana(sarana);
    setIsAddEditModalOpen(true);
  };

  const handleDeleteSarana = (sarana) => {
    setSelectedSarana(sarana);
    setIsDeleteModalOpen(true);
  };

  const handleSaveSarana = async (saranaData) => {
    // Implement save logic here
    console.log('Saving sarana:', saranaData);
    await fetchSaranas(); // Refresh the list after saving
    setIsAddEditModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedSarana) {
      // Implement delete logic here
      console.log('Deleting sarana:', selectedSarana);
      await fetchSaranas(); // Refresh the list after deleting
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-4">
      <AddEditSaranaModal
        sarana={selectedSarana}
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        onSave={handleSaveSarana}
      />
      <ConfirmDeleteModal
        namaBangunan={selectedSarana?.namaBangunan}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        sarana={sarana}
      />

      <div className="flex w-full justify-between items-center border-b border-[#1D564F] pb-4">
        <div className="w-[400px] relative flex items-center border px-3 border-[#1D564F]">
          <input
            type="search"
            className="w-full outline-none py-2"
            placeholder="Search name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="text-[#1D564F]" />
        </div>
        <div className="flex items-center gap-10 h-full">
          <button
            onClick={() => setIsPreviewModalOpen(true)}
            className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview Landing Page
          </button>
          <button
            onClick={handleAddSarana}
            className="bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2 px-3 py-2"
          >
            <PlusIcon />
            <p>Tambah sarana</p>
          </button>
        </div>
      </div>

      <div className="w-full py-4">
        <div className="overflow-x-auto shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-[#039786] text-white">
                <th className="px-6 py-4 text-left">No</th>
                <th className="px-6 py-4 text-left">Nama Bangunan</th>
                <th className="px-6 py-4 text-center">Jml</th>
                <th className="px-6 py-4 text-center">Vol</th>
                <th className="px-6 py-4 text-center">Kondisi</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading
                ? Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index}>
                        <td colSpan="6" className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        </td>
                      </tr>
                    ))
                : currentSaranas.map((item, index) => (
                    <tr key={item['id-bangunan']} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{indexOfFirstItem + index + 1}</td>
                      <td className="px-6 py-4">{item.namaBangunan}</td>
                      <td className="px-6 py-4 text-center">{item.jumlah}</td>
                      <td className="px-6 py-4 text-center">{item.volume} m²</td>
                      <td className="px-6 py-4 text-center">{item.kondisi}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteSarana(sarana)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleEditSarana(item)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#039786] focus:outline-none"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded bg-[#039786] p-2 text-white hover:bg-emerald-600 disabled:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <span className="flex items-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded bg-[#039786] p-2 text-white hover:bg-emerald-600 disabled:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
