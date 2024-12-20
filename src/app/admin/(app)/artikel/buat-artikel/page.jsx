'use client';
import React, { useState } from 'react';
import { ExternalLink, Search, ChevronDown, Plus } from 'lucide-react';
import Link from 'next/link';
import EditorComponent from '@/components/__EditorInput';
import ImageUploader from '@/components/__DropImageInput';
import ModalViewArtikel from '../_components/ModalViewArtikel';

export default function PageBerita() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tags: [],
    headerImage: null,
    content: '',
  });
  const [currentTag, setCurrentTag] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState(['Teknologi', 'Kesehatan', 'Olahraga', 'Bisnis']);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [content, setEditorContent] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const onHandleOpenModal = () => setOpenModal(!openModal);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (htmlContent) => {
    setEditorContent(htmlContent);
    setFormData((prevData) => ({
      ...prevData,
      content: htmlContent,
    }));
  };

  const handleImageUpload = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      headerImage: file,
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleCategoryChange = (category) => {
    setFormData((prevData) => ({
      ...prevData,
      category,
    }));
    setShowDropdown(false);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories((prevCategories) => [...prevCategories, newCategory.trim()]);
      setFormData((prevData) => ({
        ...prevData,
        category: newCategory.trim(),
      }));
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', { ...formData, content });
    console.log('Form Data:', content);
  };

  return (
    <>
      <ModalViewArtikel data={formData} handleOpen={onHandleOpenModal} open={openModal} />
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

      <form onSubmit={handleSubmit} className="space-y-6 mt-3">
        <div className="space-y-2">
          <label className="block">
            <span className=" font-extralight text-gray-900 ">Judul Artikel</span>
            <span className="ml-1 text-sm text-gray-500">(Required)</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block">
            <span className=" font-extralight text-gray-900 ">Kategori</span>
            <span className="ml-1 text-sm text-gray-500">(Required)</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-left focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 flex justify-between items-center"
            >
              {formData.category || 'Pilih kategori'}
              <ChevronDown className="h-4 w-4" />
            </button>
            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className="block w-full px-4 py-2 text-left hover:bg-emerald-50"
                  >
                    {category}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setShowCategoryInput(true)}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-emerald-50 text-emerald-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah kategori baru
                </button>
              </div>
            )}
          </div>
          {showCategoryInput && (
            <div className="flex mt-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-grow rounded-l-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Nama kategori baru"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="rounded-r-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Tambah
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block">
            <span className=" font-extralight text-gray-900 ">Header Artikel</span>
            <span className="ml-1 text-sm text-gray-500">(Required)</span>
          </label>
          <ImageUploader onImageUpload={handleImageUpload} />
        </div>

        <div className="space-y-2">
          <label className="block">
            <span className=" font-extralight text-gray-900 ">Tag</span>
            <span className="ml-1 text-sm text-gray-500">(Required)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
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

        <div className="space-y-2">
          <label className="block">
            <span className="text-lg font-extralight text-gray-900 ">Isi</span>
            <span className="ml-1 text-sm text-gray-500">(Required)</span>
          </label>
          <div className="mt-2">
            <EditorComponent onContentChange={handleEditorChange} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
            onClick={onHandleOpenModal}
          >
            Open Preview
            <ExternalLink className="ml-2 h-4 w-4" />
          </button>

          <div className="relative">
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            >
              Publish
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
