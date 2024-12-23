import React from 'react';
import './globals.css';

import { Montserrat } from 'next/font/google';

const roboto = Montserrat({
  weight: ['400', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});
export const metadata = {
  title: 'Madrasayah Aliyah As-siroji',
  description: 'Official Madrasayah Aliyah As-siroji',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
