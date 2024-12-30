import React from 'react';

export default function ErrorState({ message }) {
  return (
    <div className="text-center text-red-500 p-4">
      <p>{message}</p>
      <button onClick={() => window.location.reload()} className="mt-4">
        Coba Lagi
      </button>
    </div>
  );
}
