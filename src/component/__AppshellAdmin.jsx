import React from 'react';

export default function AppshellAdmin({ children }) {
  return (
    <div className="bg-red-400 h-20 mx-auto max-w-7xl ">
      <div>
        <div className="bg-gray-400"></div>
        <div>{children}</div>
      </div>
    </div>
  );
}
