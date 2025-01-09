import React from 'react';
import { getAllRecords } from '@/service';
import GuruKaryawanPage from './_components';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  try {
    const guru = await getAllRecords('Guru');
    if (!guru) {
      notFound();
    }

    return <GuruKaryawanPage guru={guru} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  } finally {
    await prisma.$disconnect();
  }
}
