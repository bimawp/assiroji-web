'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';
import Image from 'next/image';

const ImageUploader = React.memo(({ onImageUpload, initialState = '' }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialState || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialState && typeof initialState === 'string') {
      setImagePreview(initialState);
    }
  }, [initialState]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      onImageUpload(file);

  
      return () => {
        URL.revokeObjectURL(previewUrl);
      };
    } else {
      alert('Hanya file gambar yang diperbolehkan!');
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {imagePreview ? (
          <Image
            width={400}
            height={300}
            src={imagePreview}
            alt="Uploaded Preview"
            className="max-w-full h-auto mx-auto rounded-lg"
            priority
          />
        ) : (
          <div>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop gambar di sini, atau klik untuk memilih file
            </p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      {image && <p className="mt-2 text-sm text-gray-600 truncate">File terpilih: {image.name}</p>}
    </div>
  );
});

ImageUploader.displayName = 'ImageUploader';
export default ImageUploader;
