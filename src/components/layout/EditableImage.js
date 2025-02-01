'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function EditableImage({ link, setLink, setSelectedFile }) {
  const handleFileChange = (ev) => {
    const files = ev.target.files;
    if (files?.length === 1) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) { // Limit file size to 2MB
        toast.error('File size must be less than 2MB');
        return;
      }
      setSelectedFile(file);
      setLink(URL.createObjectURL(file)); // Display the selected image
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {link ? (
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-lg overflow-hidden">
          <Image
            src={link}
            alt="Spare Part Image"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
          No image
        </div>
      )}
      <label className="block w-full text-center">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <span className="inline-block w-full max-w-[200px] py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
          {link ? 'Change Image' : 'Upload Image'}
        </span>
      </label>
    </div>
  );
}