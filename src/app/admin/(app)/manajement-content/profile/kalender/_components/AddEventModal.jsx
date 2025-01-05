'use client';

import React, { useEffect, useState } from 'react';

export default function AddEventModal({ isOpen, onClose, onSubmit, selectedDate, eventToEdit }) {
  const [date, setDate] = useState('');
  const [deskripsi, setDescription] = useState('');
  const [color, setColor] = useState('blue');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const formatToDDMMYYYY = (date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };
    console.log('edit : ', eventToEdit);
    console.log('selectedDate : ', selectedDate);
    if (eventToEdit) {
      setDate(formatToDDMMYYYY(new Date(eventToEdit?.date)));
      setDescription(eventToEdit.deskripsi);
      setColor(eventToEdit.color);
    } else if (selectedDate) {
      setDate(formatToDDMMYYYY(selectedDate));
      setDescription('');
      setColor('blue');
    }
  }, [selectedDate, eventToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const [day, month, year] = date.split('-');
    const formattedDate = `${year}-${month}-${day}`;

    const eventData = {
      deskripsi,
      color,
      date: formattedDate,
    };

    console.log('eventData : ', eventData);
    try {
      const fethc = eventToEdit
        ? '/api/v1.0.0/auth/kalender/' + eventToEdit.id_tgl_kalender
        : '/api/v1.0.0/auth/kalender';
      const response = await fetch(fethc, {
        method: eventToEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to save event');
      }

      const result = await response.json();
      console.log('Event saved:', result);

      setDescription('');
      setColor('blue');
      onClose();
      onSubmit();
    } catch (error) {
      console.error('Error saving event:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {eventToEdit ? 'Edit Acara' : 'Tambah Acara Baru'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal
              </label>
              <input
                id="date"
                type="date"
                value={date.split('-').reverse().join('-')}
                onChange={(e) => {
                  const [year, month, day] = e.target.value.split('-');
                  setDate(`${day}-${month}-${year}`);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <input
                id="deskripsi"
                value={deskripsi}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700 mb-1">Warna</span>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="blue"
                    checked={color === 'blue'}
                    onChange={() => setColor('blue')}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Biru</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="red"
                    checked={color === 'red'}
                    onChange={() => setColor('red')}
                    className="form-radio text-red-500"
                  />
                  <span className="ml-2">Merah</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {eventToEdit ? 'Update Acara' : 'Tambah Acara'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
