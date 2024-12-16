import React from 'react';
import './../../globals.css';
import AppshellAdmin from '@/component/__AppshellAdmin';

export default function Layout({ children }) {
  return (
    <>
      <AppshellAdmin>{children}</AppshellAdmin>
    </>
  );
}
