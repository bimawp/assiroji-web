'use client';
import Header from '@/components/__Header';
import formatToIndonesianDate from '@/lib/date';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function MyCalendar({ data }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const highlightDates = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      const isSpecialDate = data.find((d) => {
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
  const filteredSpecialDates = data.filter((item) => {
    const date = new Date(item.date);
    return date.getMonth() + 1 === currentMonth;
  });

  return (
    <div className="bg-gradient-to-b from-teal-200 to-teal-400 p-4 md:p-0 text-black">
      <Header
        h1Content="Kalender"
        subtitle="Kompas Akademik: Mengarahkan Masa Depan Cemerlang"
        backgroundImage="/image/rumah.png"
      />
      <div className="flex flex-col items-center text-center space-y-4 -mt-10 z-10 relative">
        <Image
          src="/image/logo.png"
          alt="MA AS-SIROJI Logo"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>
      <div className="max-w-4xl mx-auto py-5">
        <div className="space-y-6 flex flex-col items-center justify-center">
          <Calendar
            className="rounded-xl w-full"
            tileClassName={highlightDates}
            onActiveStartDateChange={({ activeStartDate }) => {
              setCurrentMonth(activeStartDate.getMonth() + 1);
            }}
          />
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className=" font-bold mb-4">Hari Libur Bulan Ini</h2>
            {data && filteredSpecialDates && filteredSpecialDates.length > 0 ? (
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
                  </li>
                ))}
              </ul>
            ) : (
              <p>Tidak ada hari libur pada bulan ini.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
