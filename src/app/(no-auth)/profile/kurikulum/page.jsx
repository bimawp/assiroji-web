import React from 'react';
import { getAllRecords } from '@/service';
import KurikulumPage from './_components';
import { prisma } from '@/lib/prisma';
export const revalidate = 3600;
export default async function Page() {
  try {
    const Kurikulum = await getAllRecords('Kurikulum');
    if (!Kurikulum) {
      notFound();
    }

    return <KurikulumPage data={Kurikulum[0]} />;
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
