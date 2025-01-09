import React from 'react';
import ContactPage from './_components/Dashboard';
import { getAllRecords } from '@/service';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  try {
    const contacts = await getAllRecords('Contact');
    if (!contacts) {
      notFound();
    }

    return <ContactPage data={contacts[0]} />;
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
