import Appshell from '@/component/__Appshell';
import React from 'react';
import './../globals.css';
import Footer from '@/component/__Fotter';

export const metadata = {
  title: 'Home Page',
  description: 'Welcome to the home page',
};
export default function Layout({ children }) {
  return (
    <>
      <Appshell />
      <main>{children}</main>
      <Footer />
    </>
  );
}
