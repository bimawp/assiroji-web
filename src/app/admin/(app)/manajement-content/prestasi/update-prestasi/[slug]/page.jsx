'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ExternalLink, Search, ChevronDown, Plus } from 'lucide-react';
import Link from 'next/link';
import EditorComponent from '@/components/__EditorInput';
import ImageUploader from '@/components/__DropImageInput';
import ModalViewPrestasi from '../../_components/ModalViewPrestasi';
import { useSession } from 'next-auth/react';

export default function PageUpdatePrestasi() {
  const { slug } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
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

  const [originalData, setOriginalData] = useState(null);
  const [content, setEditorContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const onHandleOpenModal = () => setOpenModal(!openModal);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoadingData(true);
      try {
        const response = await fetch(`/api/v1.0.0/auth/artikel/${slug}`, {
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const formattedData = {
          title: data.title,
          description: data.description,
          category: data.category,
          tags: data.tags,
          headerImage: data.headerImage,
          content: data.content,
        };
        setFormData(formattedData);
        setOriginalData(formattedData);
        setEditorContent(data.content);
      } catch (error) {
        console.error('Error fetching prestasi:', error);
        setError('Failed to load prestasi. Please try again later.');
      } finally {
        setIsLoadingData(false);
      }
    };

    if (slug && session?.user?.access_token) {
      fetchArticle();
    }
  }, [slug, session?.user?.access_token]);

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

  const isEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null)
      return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
      if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const sendFormData = new FormData();
      let hasChanges = false;

      Object.keys(formData).forEach((key) => {
        if (!isEqual(formData[key], originalData[key])) {
          if (key === 'tags' && Array.isArray(formData[key])) {
            formData[key].forEach((tag, index) => {
              sendFormData.append(`tags[${index}]`, tag);
            });
          } else if (key === 'headerImage' && formData[key] instanceof File) {
            sendFormData.append(key, formData[key]);
          } else {
            sendFormData.append(key, formData[key]);
          }
          hasChanges = true;
        }
      });

      if (!hasChanges) {
        setIsLoading(false);
        return;
      }

      if (sendFormData.has('title')) {
        const title = sendFormData.get('title');
        const slug = title
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '');
        sendFormData.set('slug', slug);
      }

      const authorId = session.user.id;
      if (authorId && !sendFormData.has('authorId')) {
        sendFormData.append('authorId', authorId);
      }

      const response = await fetch(`/api/v1.0.0/auth/artikel/${slug}`, {
        method: 'PUT',
        body: sendFormData,
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      router.push('/admin/manajement-content/prestasi');

      setOriginalData(formData);
    } catch (error) {
      console.error('Error updating article:', error);
      setError('Failed to update article. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoadingData) {
    return (
      <div className="p-4 space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            Update prestasi
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-4">
        {isLoadingData ? (
          <>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-900">Judul Prestasi</span>
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
                <span className="text-sm font-medium text-gray-900">Deskripsi Prestasi</span>
                <span className="ml-1 text-sm text-gray-500">(Required)</span>
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-900">Header Prestasi</span>
                <span className="ml-1 text-sm text-gray-500">(Required)</span>
              </label>
              <ImageUploader
                onImageUpload={handleImageUpload}
                initialState={formData.headerImage}
              />
            </div>

            <div className="space-y-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-900">Tag</span>
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
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
                <span className="text-sm font-medium text-gray-900">Isi</span>
                <span className="ml-1 text-sm text-gray-500">(Required)</span>
              </label>
              <div className="mt-2">
                <EditorComponent
                  onContentChange={handleEditorChange}
                  initialContent={formData.content || ''}
                />
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      Update
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
}
