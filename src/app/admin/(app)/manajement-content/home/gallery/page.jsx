'use client';
import React, { useState } from 'react';
import Dashboard from './_components/Dashboard';

const defaultGallery = [
  {
    id: 1,
    caption: 'Kegiatan kepanduan untuk membentuk karakter dan keterampilan',
    imageUrl: 'https://cdn.pixabay.com/photo/2018/06/07/16/49/virtual-3460451_1280.jpg',
    isActive: true,
  },
  {
    id: 2,
    caption: 'Olahraga tim yang mengembangkan kerjasama dan kebugaran',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_1280.jpg',
    isActive: true,
  },
  {
    id: 3,
    caption: 'Kegiatan musik vokal untuk mengasah bakat dan kreativitas',
    imageUrl: 'https://cdn.pixabay.com/photo/2018/06/07/16/49/virtual-3460451_1280.jpg',
    isActive: false,
  },
];

export default function ExtracurricularCMS() {
  const [gallery, setGallery] = useState(defaultGallery);

  return (
    <div className="">
      <Dashboard gallery={gallery} setGallery={setGallery} />
    </div>
  );
}
