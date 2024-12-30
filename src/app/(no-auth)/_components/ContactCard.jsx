import React from 'react';

export default function ContactCard({ data }) {
  return (
    <div className="space-y-2">
      <p className="flex items-center gap-2">
        <span className="font-bold">PHONE:</span>
        <a href={`tel:${data.phone}`} className="hover:text-[#ffc107] transition-colors">
          {data.phone}
        </a>
      </p>
      <p className="flex items-center gap-2">
        <span className="font-bold">EMAIL:</span>
        <a href="mailto:contact@example.com" className="hover:text-[#ffc107] transition-colors">
          {data.email}
        </a>
      </p>
    </div>
  );
}
