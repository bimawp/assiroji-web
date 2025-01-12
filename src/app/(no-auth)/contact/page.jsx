import React from 'react';
import ContactPage from './_components/Dashboard';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  try {
    const ress = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/v1.0.0/view/contact');
    if (!ress) {
      notFound();
    }
    const data = await ress.json();

    return <ContactPage data={data} />;
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
