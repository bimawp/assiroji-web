'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Eye, PlusIcon, Search } from 'lucide-react';
import ModalDeletePrestasi from './_components/ModalDeletePrestasi';
import ModalViewPrestasi from './_components/ModalViewPrestasi';

export default function Page() {
  const [modalDelete, setModalDelete] = useState(false);
  const [prestasiDelete, setPrestasiDelete] = useState('');
  const [prestasis, setPrestasis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const onModalDelete = () => setModalDelete(!modalDelete);
  useEffect(() => {
    if (prestasis.length > 0) onModalDelete(true);
  }, [prestasiDelete]);

  useEffect(() => {
    const fetchPrestasis = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/test');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPrestasis(data);
      } catch (error) {
        console.error('Error fetching prestasis:', error);
        setError('Failed to load prestasis. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrestasis();
  }, []);
  const filteredPrestasis = prestasis.filter(
    (prestasi) =>
      prestasi.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      prestasi.category === 'Prestasi'
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPrestasis = filteredPrestasis.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredPrestasis.length / itemsPerPage);
  return (
    <div className="p-4">
      <ModalDeletePrestasi open={modalDelete} handleOpen={onModalDelete} data={prestasiDelete} />
      <ModalViewPrestasi
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        data={filteredPrestasis}
      />
      <div className="flex w-full justify-between items-center border-b border-[#1D564F] pb-4">
        <div className="w-[400px] relative flex items-center border  px-3 border-[#1D564F]">
          <input
            type="search"
            className=" w-full outline-none py-2"
            placeholder="Search artikel"
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
          <Link
            href="/admin/manajement-content/prestasi/buat-prestasi"
            className="bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2 px-3 py-2"
          >
            <PlusIcon />
            <p>Tambah prestasi</p>
          </Link>
        </div>
      </div>
      <div className="w-full py-4">
        <div className="overflow-x-auto shadow-md ">
          <table className="w-full border-collapse ">
            <thead>
              <tr className="bg-[#039786] ">
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Nama</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Update</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Author</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Status</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-white">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y shadow-lg">
              {prestasis.length > 0
                ? currentPrestasis.map((prestasi, index) => (
                    <tr key={index} className="">
                      <td className="px-6 py-4 text-sm">{prestasi.title}</td>
                      <td className="px-6 py-4 text-sm">{prestasi.category}</td>
                      <td className="px-6 py-4 text-sm">{prestasi.title}</td>
                      <td className="px-6 py-4 text-sm">{prestasi.tags}</td>
                      <td className="px-6 py-4 text-sm">{prestasi.headerImage}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => setPrestasiDelete(prestasi)}
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
                          <Link
                            href={`/admin/manajement-content/prestasi/update-prestasi/${prestasi['id-artikel']}`}
                            className="text-blue-500 hover:text-blue-700"
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
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                : [1, 2, 3, 4].map((index) => (
                    <tr key={index} className="">
                      <td className="px-6 py-4">
                        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-300" />
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