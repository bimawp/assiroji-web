'use client';
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

import { useSession } from 'next-auth/react';

import ConfirmDeleteModal from './_components/ConfirmDeleteModal';
import EditPPDBModal from './_components/EditPPDBModal.jsx';

export default function Page() {
  const [ppdbData, setPPDBData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tahunPPDB, setTahunPPDB] = useState('');
  const [selectedPPDB, setSelectedPPDB] = useState(null);
  const { data: session } = useSession();

  const fetchPPDBData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1.0.0/auth/ppdb/data-pendaftar', {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setTahunPPDB(data.latestPpdb);
      setPPDBData(data.dataPendaftar);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.access_token) fetchPPDBData();
  }, [session?.user?.access_token]);

  const filteredPPDBData = ppdbData.filter((item) =>
    item.user.formulirPendaftaran.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPPDBData = filteredPPDBData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredPPDBData.length / itemsPerPage);

  const handleEditPPDB = (ppdb) => {
    setSelectedPPDB(ppdb);
    setIsEditModalOpen(true);
  };

  const handleDeletePPDB = (ppdb) => {
    setSelectedPPDB(ppdb);
    setIsDeleteModalOpen(true);
  };

  const handleSavePPDB = async () => {
    await fetchPPDBData();
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedPPDB) {
      setIsLoadingDelete(true);
      try {
        await fetch(`/api/v1.0.0/auth/ppdb/${selectedPPDB.id_data_pendaftar}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
          },
        });
      } catch (error) {
        console.error('Error deleting item:', error);
      } finally {
        setIsLoadingDelete(false);
        await fetchPPDBData();
        setIsDeleteModalOpen(false);
      }
    }
  };

  return (
    <div className="">
      <EditPPDBModal
        ppdb={selectedPPDB}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSavePPDB}
      />
      <ConfirmDeleteModal
        namaPendaftar={selectedPPDB?.user.formulirPendaftaran.namaLengkap}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isLoadingDelete}
      />

      <div className="flex w-full justify-between items-center bg-white border-b border-gray-200 p-4">
        <div className="w-[400px] relative flex items-center border rounded-md px-3 border-[#1D564F]">
          <input
            type="search"
            className="w-full outline-none py-2"
            placeholder="Search nama pendaftar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="text-[#1D564F]" />
        </div>
      </div>

      <div className="w-full p-4">
        <h2 className="mb-2 font-bold">Seleksi PPDB tahun : {tahunPPDB}</h2>
        <div className="overflow-x-auto shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-[#039786] text-white">
                <th className="px-6 py-4 text-left">No</th>
                <th className="px-6 py-4 text-left">Nama lengkap</th>
                <th className="px-6 py-4 text-left">Jenis Pendaftaran</th>
                {/* <th className="px-6 py-4 text-center">Jenjang</th> */}
                <th className="px-6 py-4 text-center">Status Pendaftaran</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                [1, 2, 3, 4].map((index) => (
                  <tr key={index} className="">
                    <td className="px-6 py-4">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-300" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-1/3 animate-pulse rounded bg-gray-300" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <div className="h-4 w-2/4 animate-pulse rounded bg-gray-300" />
                        <div className="h-4 w-2/4 animate-pulse rounded bg-gray-300" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : currentPPDBData.length > 0 ? (
                currentPPDBData.map((item, index) => (
                  <tr key={item.id_data_pendaftar} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4">{item.user.formulirPendaftaran.namaLengkap}</td>
                    <td className="px-6 py-4">{item.jenisPendaftaran}</td>
                    {/* <td className="px-6 py-4 text-center">{item.jenjang}</td> */}
                    <td className="px-6 py-4 text-center">{item.statusPendaftaran}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeletePPDB(item)}
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
                          onClick={() => handleEditPPDB(item)}
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
                ))
              ) : (
                <tr className="">
                  <td colSpan={5} className="px-6 py-4 text-center">
                    Belum ada data
                  </td>
                </tr>
              )}
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
