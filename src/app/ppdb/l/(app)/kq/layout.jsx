import React from 'react';
// import { Stepper } from './_components/Stepper';

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
