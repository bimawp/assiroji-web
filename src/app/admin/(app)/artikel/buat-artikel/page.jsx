'use client';
import React, { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import Link from 'next/link';

export default function PageBerita() {
  const [activeTab, setActiveTab] = useState('create');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div>
      <div className="flex w-full justify-between items-center border-b border-[#1D564F] pb-4">
        <div className="flex gap-1 rounded-full bg-emerald-100 p-1">
          <Link href="/admin/artikel" className={`rounded-full px-6 py-2 text-sm text-emerald-600`}>
            Artikel
          </Link>
          <div className={`rounded-full px-6 py-2 text-sm bg-emerald-600 text-white`}>
            Buat artikel
          </div>
        </div>
      </div>
      {/* Form */}
      <form className="space-y-6 mt-3">
        {/* Title */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-900">Judul Artikel</span>
            <span className="ml-1 text-sm text-gray-500">(Required)</span>
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-900">Tag</span>
            <span className="ml-1 text-sm text-gray-500">(Required)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Press Enter to add tags"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-900">Isi</span>
            <span className="ml-1 text-sm text-gray-500">(Required)</span>
          </label>
          <textarea
            className="h-64 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
          >
            Open Preview
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-2 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="inline-flex items-center rounded-t-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            >
              Publish
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 z-10 mt-0 w-full overflow-hidden rounded-b-lg bg-white shadow-lg">
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-emerald-50"
                  onClick={() => setShowDropdown(false)}
                >
                  Draft
                </button>
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-emerald-50"
                  onClick={() => setShowDropdown(false)}
                >
                  Un-Publish
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
