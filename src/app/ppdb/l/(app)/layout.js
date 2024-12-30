'use client';
import React from 'react';

import { SessionProvider } from 'next-auth/react';
import Navbar from './_components/Navbar';

export default function Layout({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}
