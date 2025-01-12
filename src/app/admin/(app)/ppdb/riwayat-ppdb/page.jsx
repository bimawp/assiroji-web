'use client';
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();
  const [ppdbData, setPPDBData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchPPDBData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/v1.0.0/auth/ppdb/log', {
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPPDBData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (session?.user?.access_token) fetchPPDBData();
  }, [session?.user?.access_token]);

  const filteredPPDBData = ppdbData.filter((item) =>
    item.namaPPDB.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPPDBData = filteredPPDBData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredPPDBData.length / itemsPerPage);

  return (
    <div className="">
      <div className="flex w-full justify-between items-center bg-white border-b border-gray-200 p-4">
        <div className="w-[400px] relative flex items-center border rounded-md px-3 border-[#1D564F]">
          <input
            type="search"
            className="w-full outline-none py-2"
            placeholder="Search PPDB name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="text-[#1D564F]" />
        </div>
      </div>

      <div className="w-full p-4">
        <h2 className="mb-2 font-bold">Log PPDB yang Sudah Ditutup</h2>
        <div className="overflow-x-auto shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-[#039786] text-white">
                <th className="px-6 py-4 ">No</th>
                <th className="px-6 py-4 ">Nama PPDB</th>
                <th className="px-6 py-4 ">Tahun Ajaran</th>
                <th className="px-6 py-4 ">Status</th>
                <th className="px-6 py-4 ">Jumlah daftar</th>
                <th className="px-6 py-4 ">action</th>
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
                    <td className="px-6 py-4">
                      <div className="h-4 w-1/4 animate-pulse rounded bg-gray-300" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-1/4 animate-pulse rounded bg-gray-300" />
                    </td>
                  </tr>
                ))
              ) : currentPPDBData.length > 0 ? (
                currentPPDBData.map((item, index) => (
                  <tr key={item.id_ppdb} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-center">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4 text-center">{item.namaPPDB}</td>
                    <td className="px-6 py-4 text-center">{item.tahunAjaran}</td>
                    <td className="px-6 py-4 text-center">{item.status}</td>
                    <td className="px-6 py-4 text-center">{item.jumlahDaftar}</td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        className="text-blue-600 hover:text-blue-800"
                        href={`/admin/ppdb/riwayat-ppdb/${item.id_ppdb}`}
                      >
                        detail
                      </Link>
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
