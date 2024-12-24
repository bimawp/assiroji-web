'use client'
import React from 'react';
import './../../globals.css';
import AppshellAdmin from '@/components/__AppshellAdmin';
import { SessionProvider } from 'next-auth/react';

export default function Layout({ children }) {
  return (
    <SessionProvider>
      <AppshellAdmin>{children}</AppshellAdmin>
    </SessionProvider>
  );
}
