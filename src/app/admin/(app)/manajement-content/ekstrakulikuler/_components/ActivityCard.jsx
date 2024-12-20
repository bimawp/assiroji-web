'use client';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function ActivityCard({ activity, onEdit, onDelete, onToggleActive }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image src={activity.imageUrl} alt={activity.name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{activity.name}</h3>
          <div className="relative group">
            <button className="p-1 rounded-full hover:bg-gray-200">
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <button
                onClick={onEdit}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Edit className="inline-block mr-2 h-4 w-4" />
                Edit
              </button>
              <button
                onClick={onDelete}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Trash2 className="inline-block mr-2 h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
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
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={activity.isActive}
                onChange={onToggleActive}
              />
              <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div
                className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${
                  activity.isActive ? 'transform translate-x-full bg-blue-500' : ''
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
