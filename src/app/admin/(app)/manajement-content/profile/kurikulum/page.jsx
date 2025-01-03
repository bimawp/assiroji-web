'use client';

import React, { useState, useEffect } from 'react';
import EditorComponent from '@/components/__EditorInput';

export default function SocialMediaSettings() {
  const [content, setEditorContent] = useState('');
  const [kurikulumId, setKurikulumId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchKurikulumData();
  }, []);

  const fetchKurikulumData = async () => {
    try {
      const response = await fetch('/api/v1.0.0/auth/kurikulum');
      const data = await response.json();
      console.log('data', data);
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
    const url = '/api/v1.0.0/auth/kurikulum';
    const method = kurikulumId ? 'PUT' : 'POST';
    const body = JSON.stringify({
      id_kurikulum: kurikulumId,
      deskripsi: content,
    });

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
        console.log('Data saved successfully:', result);
        // Update the kurikulumId if it was a POST request
        if (!kurikulumId) {
          setKurikulumId(result.id_kurikulum);
        }
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
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
            >
              {kurikulumId ? 'Update' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
