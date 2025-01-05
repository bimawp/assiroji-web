'use client';
import React, { useEffect, useState } from 'react';
import Dashboard from './_components/Dashboard';

export default function ExtracurricularCMS() {
  const [activities, setActivities] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/v1.0.0/auth/page/home/ekstrakulikuler');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setActivities(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load articles. Please try again later.');
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div className="">
      <Dashboard activities={activities} setActivities={setActivities} onRefresh={fetchArticles} />
    </div>
  );
}
