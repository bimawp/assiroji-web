import React from 'react';
import ContactPage from './_components/Dashboard';
import { getAllRecords } from '@/service';

export default async function Page() {
  try {
    const contacts = await getAllRecords('Contact');
    if (!contacts) {
      notFound();
    }

    console.log(contacts);

    return <ContactPage data={contacts[0]} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
