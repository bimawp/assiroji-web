import { CheckCircle } from 'lucide-react';
import React from 'react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full border-2  flex items-center justify-center">
            <CheckCircle size={40} className="text-green-500" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-center mb-4">Persetujuan Persyaratan PPDB</h2>
        <p className="text-center text-gray-600 mb-6">
          Dengan ini kami menyatakan bersedia mengikuti semua regulasi an aturan yang ada dalam
          proses PPDB MA Assiroji TA 2025/2026
        </p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Tidak Bersedia
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Bersedia
          </button>
        </div>
      </div>
    </div>
  );
}
