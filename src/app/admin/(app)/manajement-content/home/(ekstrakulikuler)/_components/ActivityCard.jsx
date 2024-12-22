'use client';

import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

export default function ActivityCard({ activity, onEdit, onDelete, onToggleActive }) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image src={activity.imageUrl} alt={activity.name} layout="fill" objectFit="cover" />
        <div className="absolute top-2 right-2" ref={optionsRef}>
          <div className="relative">
            <button
              className="p-1 rounded-full bg-white shadow-md hover:bg-gray-100"
              onClick={() => setShowOptions(!showOptions)}
            >
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    onEdit();
                    setShowOptions(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit className="inline-block mr-2 h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete();
                    setShowOptions(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="inline-block mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{activity.name}</h3>
        </div>
        <p className="text-gray-600 mb-4">{activity.description}</p>
        <div className="flex justify-between items-center">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              activity.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
            }`}
          >
            {activity.isActive ? 'Active' : 'Inactive'}
          </span>
          <button
            onClick={onToggleActive}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none
              ${activity.isActive ? 'bg-blue-600' : 'bg-gray-200'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                ${activity.isActive ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
