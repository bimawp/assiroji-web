'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RegistrationPage({
  onRefresh,
  ppdbData,
  id_user,
  fetching,
  jenisPendaftaran,
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    namaLengkap: '',
    jenisKelamin: '',
    tempatTanggalLahir: '',
    asalSekolah: '',
    namaIbu: '',
    pendidikanTerakhirIbu: '',
    pekerjaanIbu: '',
    namaAyah: '',
    pendidikanTerakhirAyah: '',
    pekerjaanAyah: '',
    alamatLengkap: '',
    noTelepon: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (ppdbData?.dataUser) setFormData(ppdbData?.dataUser);
  }, [ppdbData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.namaLengkap) newErrors.namaLengkap = 'Nama lengkap wajib diisi.';
    if (!formData.jenisKelamin) newErrors.jenisKelamin = 'Jenis kelamin wajib diisi.';
    if (!formData.tempatTanggalLahir)
      newErrors.tempatTanggalLahir = 'Tempat dan tanggal lahir wajib diisi.';
    if (!formData.asalSekolah) newErrors.asalSekolah = 'Asal sekolah wajib diisi.';
    if (!formData.alamatLengkap) newErrors.alamatLengkap = 'Alamat lengkap wajib diisi.';
    if (!formData.noTelepon) newErrors.noTelepon = 'Nomor telepon wajib diisi.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      setIsLoading(true);
      const response = await fetch('/api/v1.0.0/auth/pendaftaran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          id_user,
          id_ppdb: ppdbData?.id_ppdb,
          jenisPendaftaran
        }),
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      });

      if (response.ok) {
        alert('Pendaftaran berhasil!');
        router.refresh();
        setFormData({
          namaLengkap: '',
          jenisKelamin: '',
          tempatTanggalLahir: '',
          asalSekolah: '',
          namaIbu: '',
          pendidikanTerakhirIbu: '',
          pekerjaanIbu: '',
          namaAyah: '',
          pendidikanTerakhirAyah: '',
          pekerjaanAyah: '',
          alamatLengkap: '',
          noTelepon: '',
        });
        onRefresh(!fetching);
      } else {
        alert('Gagal mendaftar. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">
        {jenisPendaftaran == 'baru' ? 'Daftar siswa baru' : 'Daftar ulang'}
      </h2>
      <p className="text-gray-600 mb-6">
        Silakan lengkapi data diri Anda untuk melanjutkan proses pendaftaran
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama Lengkap */}
        <div>
          <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
          <input
            type="text"
            name="namaLengkap"
            value={formData.namaLengkap}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.namaLengkap ? 'border-red-500' : 'focus:ring-blue-500'
            }`}
            placeholder="Masukkan nama lengkap"
          />
          {errors.namaLengkap && <p className="text-red-500 text-sm">{errors.namaLengkap}</p>}
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="block text-sm font-medium mb-1">Jenis Kelamin</label>
          <select
            name="jenisKelamin"
            value={formData.jenisKelamin}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.jenisKelamin ? 'border-red-500' : 'focus:ring-blue-500'
            }`}
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          {errors.jenisKelamin && <p className="text-red-500 text-sm">{errors.jenisKelamin}</p>}
        </div>

        {/* Tempat Tanggal Lahir */}
        <div>
          <label className="block text-sm font-medium mb-1">Tempat, Tanggal Lahir</label>
          <input
            type="text"
            name="tempatTanggalLahir"
            value={formData.tempatTanggalLahir}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.tempatTanggalLahir ? 'border-red-500' : 'focus:ring-blue-500'
            }`}
            placeholder="Contoh: Jakarta, 2000-01-01"
          />
          {errors.tempatTanggalLahir && (
            <p className="text-red-500 text-sm">{errors.tempatTanggalLahir}</p>
          )}
        </div>

        {/* Asal Sekolah */}
        <div>
          <label className="block text-sm font-medium mb-1">Asal Sekolah</label>
          <input
            type="text"
            name="asalSekolah"
            value={formData.asalSekolah}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.asalSekolah ? 'border-red-500' : 'focus:ring-blue-500'
            }`}
            placeholder="Masukkan asal sekolah"
          />
          {errors.asalSekolah && <p className="text-red-500 text-sm">{errors.asalSekolah}</p>}
        </div>

        {/* Nama Ibu */}
        <div>
          <label className="block text-sm font-medium mb-1">Nama Ibu</label>
          <input
            type="text"
            name="namaIbu"
            value={formData.namaIbu}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama ibu"
          />
        </div>

        {/* Pendidikan Terakhir Ibu */}
        <div>
          <label className="block text-sm font-medium mb-1">Pendidikan Terakhir Ibu</label>
          <input
            type="text"
            name="pendidikanTerakhirIbu"
            value={formData.pendidikanTerakhirIbu}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan pendidikan terakhir ibu"
          />
        </div>

        {/* Pekerjaan Ibu */}
        <div>
          <label className="block text-sm font-medium mb-1">Pekerjaan Ibu</label>
          <input
            type="text"
            name="pekerjaanIbu"
            value={formData.pekerjaanIbu}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan pekerjaan ibu"
          />
        </div>

        {/* Nama Ayah */}
        <div>
          <label className="block text-sm font-medium mb-1">Nama Ayah</label>
          <input
            type="text"
            name="namaAyah"
            value={formData.namaAyah}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama ayah"
          />
        </div>

        {/* Pendidikan Terakhir Ayah */}
        <div>
          <label className="block text-sm font-medium mb-1">Pendidikan Terakhir Ayah</label>
          <input
            type="text"
            name="pendidikanTerakhirAyah"
            value={formData.pendidikanTerakhirAyah}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan pendidikan terakhir ayah"
          />
        </div>

        {/* Pekerjaan Ayah */}
        <div>
          <label className="block text-sm font-medium mb-1">Pekerjaan Ayah</label>
          <input
            type="text"
            name="pekerjaanAyah"
            value={formData.pekerjaanAyah}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan pekerjaan ayah"
          />
        </div>

        {/* Alamat Lengkap */}
        <div>
          <label className="block text-sm font-medium mb-1">Alamat Lengkap</label>
          <textarea
            name="alamatLengkap"
            value={formData.alamatLengkap}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.alamatLengkap ? 'border-red-500' : 'focus:ring-blue-500'
            }`}
            placeholder="Masukkan alamat lengkap"
          ></textarea>
          {errors.alamatLengkap && <p className="text-red-500 text-sm">{errors.alamatLengkap}</p>}
        </div>

        {/* Nomor Telepon */}
        <div>
          <label className="block text-sm font-medium mb-1">Nomor Telepon </label>
          <input
            type="tel"
            name="noTelepon"
            value={formData.noTelepon}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.noTelepon ? 'border-red-500' : 'focus:ring-blue-500'
            }`}
            placeholder="Masukkan nomor telepon contoh 628*********"
          />
          {errors.noTelepon && <p className="text-red-500 text-sm">{errors.noTelepon}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
