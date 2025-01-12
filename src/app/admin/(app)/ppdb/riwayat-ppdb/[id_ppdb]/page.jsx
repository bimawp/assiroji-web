'use client';
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();
  const { id_ppdb } = useParams();
  const [ppdbData, setPPDBData] = useState(null);
  const [userData, setDataUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPPDBData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/v1.0.0/auth/ppdb/log/' + id_ppdb, {
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPPDBData(data?.dataPPDB);
        setDataUser(data?.dataPendaftar);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (session?.user?.access_token && id_ppdb) fetchPPDBData();
  }, [session?.user?.access_token, id_ppdb]);

  const filteredPPDBData = userData.filter((item) =>
    item.user.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPPDBData = filteredPPDBData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredPPDBData.length / itemsPerPage);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex w-full justify-between items-center bg-white border-b border-gray-200 p-4">
        <div className="flex gap-1 rounded-full bg-emerald-100 p-1">
          <Link
            href="/admin/ppdb/riwayat-ppdb"
            className={`rounded-full px-6 py-2 text-sm text-emerald-600`}
          >
            Riwayat PPDB
          </Link>
          <div className={`rounded-full px-6 py-2 text-sm bg-emerald-600 text-white`}>
            Detail PPDB
          </div>
        </div>
      </div>
      <div className="space-y-6 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">PPDB Details</h2>
          {ppdbData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold">Nama PPDB:</h3>
                <p>{ppdbData.namaPPDB}</p>
              </div>
              <div>
                <h3 className="font-semibold">Tahun Ajaran:</h3>
                <p>{ppdbData.tahunAjaran}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status:</h3>
                <p>{ppdbData.status}</p>
              </div>
              <div>
                <h3 className="font-semibold">Biaya Pendaftaran:</h3>
                <p>Rp {ppdbData.biayaPendaftaran}</p>
              </div>
              <div>
                <h3 className="font-semibold">Biaya Bulanan:</h3>
                <p>Rp {ppdbData.biayaBulanan}</p>
              </div>
              <div>
                <h3 className="font-semibold">Biaya Seragam:</h3>
                <p>Rp {ppdbData.biayaSeragam}</p>
              </div>
              <div>
                <h3 className="font-semibold">Jumlah Kuota:</h3>
                <p>{ppdbData.jumlahKuota}</p>
              </div>
              <div>
                <h3 className="font-semibold">No. WhatsApp:</h3>
                <p>{ppdbData.noWa}</p>
              </div>
              <div>
                <h3 className="font-semibold">No. Rekening BRI:</h3>
                <p>{ppdbData.noRekBRI}</p>
              </div>
            </div>
          ) : (
            <p>Loading PPDB details...</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Pendaftar PPDB</h2>
          <div className="flex w-full justify-between items-center mb-4">
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

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-[#039786] text-white">
                  <th className="px-6 py-4 text-left">No</th>
                  <th className="px-6 py-4 text-left">Nama lengkap</th>
                  <th className="px-6 py-4 text-left">Jenis Pendaftaran</th>
                  <th className="px-6 py-4 text-center">Jenjang</th>
                  <th className="px-6 py-4 text-center">Status Pendaftaran</th>
                  <th className="px-6 py-4">Action</th>
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
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{indexOfFirstItem + index + 1}</td>
                      <td className="px-6 py-4">{item.user.namaLengkap}</td>
                      <td className="px-6 py-4">{item.jenisPendaftaran}</td>
                      <td className="px-6 py-4 text-center">{item.jenjang}</td>
                      <td className="px-6 py-4 text-center">{item.statusPendaftaran}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => openModal(item.user)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="">
                    <td colSpan={6} className="px-6 py-4 text-center">
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 z-[99] top-[-30px] bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">User Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Nama Lengkap:</h3>
                  <p>{selectedUser.namaLengkap}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Jenis Kelamin:</h3>
                  <p>{selectedUser.jenisKelamin}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Tempat Tanggal Lahir:</h3>
                  <p>{selectedUser.tempatTanggalLahir}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Asal Sekolah:</h3>
                  <p>{selectedUser.asalSekolah}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Nama Ibu:</h3>
                  <p>{selectedUser.namaIbu}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Pendidikan Terakhir Ibu:</h3>
                  <p>{selectedUser.pendidikanTerakhirIbu}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Pekerjaan Ibu:</h3>
                  <p>{selectedUser.pekerjaanIbu}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Nama Ayah:</h3>
                  <p>{selectedUser.namaAyah}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Pendidikan Terakhir Ayah:</h3>
                  <p>{selectedUser.pendidikanTerakhirAyah}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Pekerjaan Ayah:</h3>
                  <p>{selectedUser.pekerjaanAyah}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Alamat Lengkap:</h3>
                  <p>{selectedUser.alamatLengkap}</p>
                </div>
                <div>
                  <h3 className="font-semibold">No Telepon:</h3>
                  <p>{selectedUser.noTelepon}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="mt-6 bg-[#039786] text-white px-4 py-2 rounded hover:bg-emerald-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
