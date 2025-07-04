"use client";

import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useState } from 'react';
import { X } from 'lucide-react';

function ImageSelection({ selectedImage }) {
  const [file, setFile] = useState(null);

  const onFileSelected = (event) => {
    setFile(event.target.files[0]);
    selectedImage(event.target.files[0]);
  };

  const removeSelectedImage = () => {
    setFile(null);
  };

  return (
    <div className="w-full">
      <label className="block mb-2 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300">
        Select Image of your room
      </label>

      <div className="mt-3">
        <label htmlFor="upload-image">
          <div
            className={`relative w-full max-w-[350px] h-[300px] sm:h-[350px] mx-auto border rounded-xl border-dotted bg-gray-50 dark:bg-gray-700 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md border-primary ${
              file ? 'bg-white' : ''
            }`}
          >
            {!file ? (
              <Image
                src={'/uploadImage.svg'}
                width={80}
                height={80}
                alt="upload placeholder"
              />
            ) : (
              <>
                <Image
                  src={URL.createObjectURL(file)}
                  alt="selected"
                  fill
                  className="object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeSelectedImage}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </label>

        <Input
          type="file"
          id="upload-image"
          className="hidden"
          accept="image/*"
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default ImageSelection;
