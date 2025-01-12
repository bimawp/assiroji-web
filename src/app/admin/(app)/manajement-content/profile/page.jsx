'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function ProfileForm() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    namaYayasan: '',
    namaMadrasah: '',
    nomorStatistik: '',
    npsn: '',
    akreditasi: '',
    alamat: '',
    rt: '',
    rw: '',
    desa: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    noTelp: '',
    website: '',
    email: '',
    namaKepala: '',
  });
  const [initialProfile, setInitialProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [siswaTahunan, setSiswaTahunan] = useState([
    { id_siswaTahunan: '', tahun: '', jumlahSiswa: '' },
    { id_siswaTahunan: '', tahun: '', jumlahSiswa: '' },
    { id_siswaTahunan: '', tahun: '', jumlahSiswa: '' },
  ]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/v1.0.0/auth/profile', {
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        if (data) {
          setProfile(data);
          setInitialProfile(data);
          const fetchedSiswaTahunan = data.siswaTahunan || [];
          setSiswaTahunan([
            fetchedSiswaTahunan[0] || { id_siswaTahunan: '', tahun: '', jumlahSiswa: '' },
            fetchedSiswaTahunan[1] || { id_siswaTahunan: '', tahun: '', jumlahSiswa: '' },
            fetchedSiswaTahunan[2] || { id_siswaTahunan: '', tahun: '', jumlahSiswa: '' },
          ]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (session?.user?.access_token) fetchProfile();
  }, [session?.user?.access_token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSiswaTahunanChange = (index, e) => {
    const { name, value } = e.target;
    const newSiswaTahunan = [...siswaTahunan];
    newSiswaTahunan[index] = { ...newSiswaTahunan[index], [name]: value };
    setSiswaTahunan(newSiswaTahunan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = '/api/v1.0.0/auth/profile';
    const method = profile.id_profile ? 'PUT' : 'POST';

    const changedFields = Object.keys(profile).reduce((acc, key) => {
      if (key !== 'siswaTahunan' && profile[key] !== initialProfile[key]) {
        acc[key] = profile[key];
      }
      return acc;
    }, {});

    const changedSiswaTahunan = siswaTahunan.reduce((acc, siswa, index) => {
      const initialSiswa = initialProfile.siswaTahunan && initialProfile.siswaTahunan[index];
      if (initialSiswa) {
        const changedSiswa = Object.keys(siswa).reduce((sAcc, sKey) => {
          if (siswa[sKey] !== initialSiswa[sKey]) {
            sAcc[sKey] = siswa[sKey];
          }
          return sAcc;
        }, {});
        if (Object.keys(changedSiswa).length > 0) {
          changedSiswa.id_siswaTahunan = siswa.id_siswaTahunan;
          acc.push(changedSiswa);
        }
      } else if (siswa.tahun && siswa.jumlahSiswa) {
        acc.push(siswa);
      }
      return acc;
    }, []);

    if (changedSiswaTahunan.length > 0) {
      changedFields.siswaTahunan = changedSiswaTahunan;
    }

    const sendData = profile.id_profile
      ? { ...changedFields, id_profile: initialProfile.id_profile }
      : changedFields;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const savedProfile = await response.json();
      setProfile(savedProfile);
      setInitialProfile(savedProfile);

      const savedSiswaTahunan = savedProfile.siswaTahunan || [];
      setSiswaTahunan([
        savedSiswaTahunan[0] || { id_siswaTahunan: '', tahun: '', jumlahSiswa: '' },
        savedSiswaTahunan[1] || { id_siswaTahunan: '', tahun: '', jumlahSiswa: '' },
        savedSiswaTahunan[2] || { id_siswaTahunan: '', tahun: '', jumlahSiswa: '' },
      ]);
      alert('Profile saved successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      await fetchProfile();
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-full mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Profile Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="namaYayasan" className="block text-sm font-medium text-gray-700">
              Nama Yayasan
            </label>
            <input
              type="text"
              id="namaYayasan"
              name="namaYayasan"
              value={profile.namaYayasan}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="namaMadrasah" className="block text-sm font-medium text-gray-700">
              Nama Madrasah
            </label>
            <input
              type="text"
              id="namaMadrasah"
              name="namaMadrasah"
              value={profile.namaMadrasah}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="nomorStatistik" className="block text-sm font-medium text-gray-700">
              Nomor Statistik
            </label>
            <input
              type="text"
              id="nomorStatistik"
              name="nomorStatistik"
              value={profile.nomorStatistik}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="npsn" className="block text-sm font-medium text-gray-700">
              NPSN
            </label>
            <input
              type="text"
              id="npsn"
              name="npsn"
              value={profile.npsn}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="akreditasi" className="block text-sm font-medium text-gray-700">
              Akreditasi
            </label>
            <input
              type="text"
              id="akreditasi"
              name="akreditasi"
              value={profile.akreditasi}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={profile.alamat}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="rt" className="block text-sm font-medium text-gray-700">
              RT
            </label>
            <input
              type="text"
              id="rt"
              name="rt"
              value={profile.rt}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="rw" className="block text-sm font-medium text-gray-700">
              RW
            </label>
            <input
              type="text"
              id="rw"
              name="rw"
              value={profile.rw}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="desa" className="block text-sm font-medium text-gray-700">
              Desa
            </label>
            <input
              type="text"
              id="desa"
              name="desa"
              value={profile.desa}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="kecamatan" className="block text-sm font-medium text-gray-700">
              Kecamatan
            </label>
            <input
              type="text"
              id="kecamatan"
              name="kecamatan"
              value={profile.kecamatan}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="kabupaten" className="block text-sm font-medium text-gray-700">
              Kabupaten
            </label>
            <input
              type="text"
              id="kabupaten"
              name="kabupaten"
              value={profile.kabupaten}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="provinsi" className="block text-sm font-medium text-gray-700">
              Provinsi
            </label>
            <input
              type="text"
              id="provinsi"
              name="provinsi"
              value={profile.provinsi}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="noTelp" className="block text-sm font-medium text-gray-700">
              No. Telp
            </label>
            <input
              type="tel"
              id="noTelp"
              name="noTelp"
              value={profile.noTelp}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="namaKepala" className="block text-sm font-medium text-gray-700">
              Nama Kepala
            </label>
            <input
              type="text"
              id="namaKepala"
              name="namaKepala"
              value={profile.namaKepala}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Siswa Tahunan</h2>
          {siswaTahunan.map((siswa, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`tahun-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tahun
                  </label>
                  <input
                    type="number"
                    id={`tahun-${index}`}
                    name="tahun"
                    value={siswa.tahun}
                    onChange={(e) => handleSiswaTahunanChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`jumlahSiswa-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Jumlah Siswa
                  </label>
                  <input
                    type="number"
                    id={`jumlahSiswa-${index}`}
                    name="jumlahSiswa"
                    value={siswa.jumlahSiswa}
                    onChange={(e) => handleSiswaTahunanChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
