'use client';
import React, { useEffect, useState } from 'react';
import Dashboard from './_components/Dashboard';
import { useSession } from 'next-auth/react';

export default function ExtracurricularCMS() {
  const [gallery, setGallery] = useState([]);
  const { data: session } = useSession();
  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/v1.0.0/auth/page/home/gallery', {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      });
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
    if (session?.user?.access_token) fetchGallery();
  }, [session?.user?.access_token]);
  return (
    <div className="">
      <Dashboard gallery={gallery} setGallery={setGallery} onRefresh={fetchGallery} />
    </div>
  );
}
