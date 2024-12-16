import { UserCircleIcon } from 'lucide-react';
import React from 'react';

export default function AppshellAdmin({ children }) {
  return (
    <div className="relative">
      <div className="w-full h-16 absolute z-20 top-0 bg-[#1D564F]">
        <div className="flex gap-4 items-center h-full pr-8 justify-end  text-white">
          <p className="font-light">Jhon doew</p>
          <UserCircleIcon className="w-11 h-11" />
        </div>
      </div>
      <div className="flex">
        <div className="bg-[#B7E0DF] w-[30%] h-screen"></div>
        <div className="w-full p-2 pt-20">{children}</div>
      </div>
    </div>
  );
}
