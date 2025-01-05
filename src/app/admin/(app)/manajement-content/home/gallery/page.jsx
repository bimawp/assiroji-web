'use client';
import React, { useEffect, useState } from 'react';
import Dashboard from './_components/Dashboard';

export default function ExtracurricularCMS() {
  const [gallery, setGallery] = useState([]);
  const fetchGallery = async () => {
    // setIsLoading(true);
    try {
      const response = await fetch('/api/v1.0.0/auth/page/home/gallery');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setGallery(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load articles. Please try again later.');
    }
  };
  useEffect(() => {
    fetchGallery();
  }, []);
  return (
    <div className="">
      <Dashboard gallery={gallery} setGallery={setGallery} onRefresh={fetchGallery} />
    </div>
  );
}
