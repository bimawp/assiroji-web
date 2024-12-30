import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function Navbar() {
  return (
    <div className="w-full h-20 bg-teal-600 flex items-center justify-end pr-20">
      <button
        className="text-white bg-gray-600 w-10 h-10 flex items-center justify-center rounded-full "
        onClick={() => signOut({ redirect: true, callbackUrl: '/ppdb/l/auth' })}
      >
        <LogOut />
      </button>
    </div>
  );
}
