import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className=" text-white">
      <div className="bg-[#164239] py-4 text-center text-sm">
        <p>&copy; {currentYear} MA AS-SIROJI. All rights reserved.</p>
      </div>
    </footer>
  );
}
