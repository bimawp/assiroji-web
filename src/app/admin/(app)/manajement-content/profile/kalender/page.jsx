'use client';

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AddEventModal from './_components/AddEventModal';
import formatToIndonesianDate from '@/lib/date';
import ConfirmDeleteModal from './_components/ConfirmDeleteModal';

export default function MyCalendar() {
  const [specialDates, setSpecialDates] = useState([]);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const fetchKalender = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1.0.0/auth/kalender');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSpecialDates(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchKalender();
  }, []);
  const handleDeleteDate = (date) => {
    setSelectedDate(date);
    setIsDeleteModalOpen(true);
  };
  const convertToISO = (dateString) => {
    const dateParts = dateString.split(' ');
    const bulanIndonesia = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    const day = dateParts[0].padStart(2, '0');
    const month = (bulanIndonesia.indexOf(dateParts[1]) + 1).toString().padStart(2, '0');
    const year = dateParts[2];

    return `${year}-${month}-${day}`;
  };

  const highlightDates = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      const isSpecialDate = specialDates.find((d) => {
        const specialFormattedDate = new Date(d.date).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        return specialFormattedDate === formattedDate;
      });

      if (date.getDay() === 6 && !isSpecialDate) {
        return 'sunday-highlight';
      }

      if (isSpecialDate) {
        return isSpecialDate.color
          ? 'special-highlight-' + isSpecialDate.color
          : 'special-highlight';
      }

      return null;
    }
  };

  const filteredSpecialDates = specialDates.filter((item) => {
    const date = new Date(item.date);
    return date.getMonth() + 1 === currentMonth;
  });

  const handleDateClick = (date) => {
    const clickedDate = formatToIndonesianDate(date);
    const existingEvent = specialDates.find((event) => {
      return event.date === convertToISO(clickedDate);
    });

    if (existingEvent) {
      setEventToEdit(existingEvent);
    } else {
      setEventToEdit(null);
    }

    setSelectedDate(date);
    setIsModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (selectedDate) {
      try {
        await fetch(`/api/v1.0.0/auth/kalender/${selectedDate['id_tgl_kalender']}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Error deleting item:', error);
      } finally {
        await fetchKalender();
        setIsDeleteModalOpen(false);
      }
    }
  };

  return (
    <>
      <ConfirmDeleteModal
        date={selectedDate?.date}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Kalender Acara</h2>
          <Calendar
            tileClassName={highlightDates}
            onActiveStartDateChange={({ activeStartDate }) => {
              setCurrentMonth(activeStartDate.getMonth() + 1);
            }}
            onClickDay={handleDateClick}
            className="w-full max-w-md mx-auto"
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Hari Libur Bulan Ini</h2>
          {filteredSpecialDates && filteredSpecialDates.length > 0 ? (
            <ul className="space-y-2">
              {filteredSpecialDates.map((item, index) => (
                <li key={item.id_tgl_kalender} className="flex items-center space-x-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      item.color === 'blue' ? 'bg-blue-500' : 'bg-red-500'
                    }`}
                  ></span>
                  <span>
                    {formatToIndonesianDate(new Date(item.date))} : {item.deskripsi}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEventToEdit(item);
                        setIsModalOpen(true);
                      }}
                      className="ml-2 text-sm text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteDate(item)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada hari libur pada bulan ini.</p>
          )}
        </div>
        <AddEventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEventToEdit(null);
          }}
          onSubmit={fetchKalender}
          selectedDate={selectedDate}
          eventToEdit={eventToEdit}
        />
        <button
          onClick={() => {
            setEventToEdit(null);
            setIsModalOpen(true);
          }}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Tambah Acara
        </button>
      </div>
    </>
  );
}
