import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  const [logoutModal, setLogoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <ConfirmLogoutModal
        isOpen={logoutModal}
        onClose={() => setLogoutModal(false)}
        onConfirm={async () => {
          try {
            setIsLoading(true);
            await signOut({ redirect: true, callbackUrl: '/ppdb/auth' });
            setLogoutModal(false);
          } catch (error) {
            console.error('Error during logout:', error);
          } finally {
            setIsLoading(false);
          }
        }}
      />
      <div className="w-full h-20 bg-teal-600 flex items-center justify-end pr-20">
        <button
          className="text-white bg-gray-600 w-10 h-10 flex items-center justify-center rounded-full "
          onClick={() => setLogoutModal(true)}
        >
          <LogOut />
        </button>
      </div>
    </>
  );
}
function ConfirmLogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`relative m-4 max-w-md w-full rounded-lg bg-white p-6 text-blue-gray-500 shadow-2xl transition-transform duration-300  ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
        <p className="mb-4">Yakin logout?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  );
}
