'use client';
import React, { useState } from 'react';
import Dashboard from './_components/Dashboard';

const defaultActivities = [
  {
    id: 1,
    name: 'Pramuka',
    description: 'Kegiatan kepanduan untuk membentuk karakter dan keterampilan',
    imageUrl: 'https://cdn.pixabay.com/photo/2018/06/07/16/49/virtual-3460451_1280.jpg',
    isActive: true,
  },
  {
    id: 2,
    name: 'Basket',
    description: 'Olahraga tim yang mengembangkan kerjasama dan kebugaran',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_1280.jpg',
    isActive: true,
  },
  {
    id: 3,
    name: 'Paduan Suara',
    description: 'Kegiatan musik vokal untuk mengasah bakat dan kreativitas',
    imageUrl: 'https://cdn.pixabay.com/photo/2018/06/07/16/49/virtual-3460451_1280.jpg',
    isActive: false,
  },
];

export default function ExtracurricularCMS() {
  const [activities, setActivities] = useState(defaultActivities);

  return (
    <div className="">
      <Dashboard activities={activities} setActivities={setActivities} />
    </div>
  );
}
