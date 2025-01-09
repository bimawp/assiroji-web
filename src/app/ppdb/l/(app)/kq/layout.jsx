import React from 'react';

export const metadata = {
  title: 'Home Page',
  description: 'Welcome to the home page',
};
export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
