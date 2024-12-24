import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const ModalDeleteArtikel = ({ open, handleOpen, className, data }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async (slug) => {
    setIsLoading(true);
    try {
      await fetch(`/api/v1.0.0/auth/artikel/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      handleOpen();
      setIsLoading(false);
    }
  };
  return (
    <div
      className={`fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`relative m-4 max-w-md w-full rounded-lg bg-white p-6 text-blue-gray-500 shadow-2xl transition-transform duration-300 ${className} ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this item?</h2>
        <p className="mb-4 text-lg font-medium">{data.title}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="text-green-700 w-24 h-12 text-lg font-bold rounded-md"
            onClick={handleOpen}
          >
            Cancel
          </button>
          <button
            className="text-white bg-red-500 w-24 h-12 text-lg font-bold rounded-md"
            onClick={() => handleDelete(data.slug)}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteArtikel;
