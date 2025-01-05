'use client';

import React, { useState, useEffect } from 'react';
import EditorComponent from '@/components/__EditorInput';

export default function SocialMediaSettings() {
  const [content, setEditorContent] = useState('');
  const [kurikulumId, setKurikulumId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    fetchKurikulumData();
  }, []);

  const fetchKurikulumData = async () => {
    try {
      const response = await fetch('/api/v1.0.0/auth/kurikulum');
      const data = await response.json();

      if (data && data.deskripsi) {
        setEditorContent(data.deskripsi);
        setKurikulumId(data.id_kurikulum);
      }
    } catch (error) {
      console.error('Error fetching kurikulum data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorChange = (htmlContent) => {
    setEditorContent(htmlContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetchLoading(true);
    const url = '/api/v1.0.0/auth/kurikulum';
    const method = kurikulumId ? 'PUT' : 'POST';
    const data = kurikulumId
      ? {
          id_kurikulum: kurikulumId,
          deskripsi: content,
        }
      : {
          deskripsi: content,
        };
    const body = JSON.stringify(data);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (response.ok) {
        const result = await response.json();

        if (!kurikulumId) {
          setKurikulumId(result.id_kurikulum);
        }
      } else {
        console.error('Failed to save data');
      }
      setFetchLoading(false);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 mt-2">
      <div className="bg-white p-2 rounded-lg shadow">
        <div className="mt-3">
          <h1 className="text-xl font-semibold mb-4">Deskripsi</h1>
          <form onSubmit={handleSubmit} className="px-2 flex flex-col gap-4">
            <div className="space-y-2">
              <label className="block">
                <span className="text-lg font-extralight text-gray-900">Isi</span>
                <span className="ml-1 text-sm text-gray-500">(Required)</span>
              </label>
              <div className="mt-2">
                <EditorComponent
                  onContentChange={handleEditorChange}
                  initialContent={content}
                  toolbarConfig={{
                    options: ['inline', 'textAlign'],
                    inline: {
                      options: ['bold', 'italic'],
                    },
                    textAlign: {
                      options: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                    },
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
              disabled={isFetchLoading}
            >
              {isFetchLoading ? (
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
              ) : kurikulumId ? (
                'Update'
              ) : (
                'Save'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
