'use client';
import React, { useState } from 'react';
import { ExternalLink, Search, ChevronDown, Plus } from 'lucide-react';
import Link from 'next/link';
import EditorComponent from '@/components/__EditorInput';
import ImageUploader from '@/components/__DropImageInput';
import ModalViewPrestasi from '../_components/ModalViewPrestasi';

export default function PagePrestasi() {
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
      <ModalViewPrestasi data={formData} handleOpen={onHandleOpenModal} open={openModal} />
      <div className="flex w-full justify-between items-center bg-white border-b border-gray-200 p-4">
        <div className="flex gap-1 rounded-full bg-emerald-100 p-1">
          <Link
            href="/admin/manajement-content/prestasi"
            className={`rounded-full px-6 py-2 text-sm text-emerald-600`}
          >
            Prestasi
          </Link>
          <div className={`rounded-full px-6 py-2 text-sm bg-emerald-600 text-white`}>
            Buat artikel
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-4">
        <div className="space-y-2">
          <label className="block">
            <span className=" font-extralight text-gray-900 ">Judul Prestasi</span>
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
            <span className=" font-extralight text-gray-900 ">Header Prestasi</span>
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
