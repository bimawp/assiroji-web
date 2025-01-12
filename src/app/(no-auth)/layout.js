import Appshell from '@/components/__Appshell';
import React from 'react';
import './../globals.css';
import Footer from '@/components/__Fotter';
import { getAllRecords } from '@/service';

export const metadata = {
  title: 'MA ASSIROJI',
  description: 'Welcome to the home page',
};

async function getFooterData() {
  const ress = await getAllRecords('Contact');

  if (!ress) {
    notFound();
  }

  return ress[0];
}
export default async function Layout({ children }) {
  const footerData = await getFooterData();
  return (
    <>
      <Appshell />
      <main>{children}</main>
      <Footer data={footerData} />
    </>
  );
}
