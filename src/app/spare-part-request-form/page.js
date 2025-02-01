'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import EditableImage from '../../components/layout/EditableImage';

export default function SparePartRequestPage() {
  const [sparePartDescription, setSparePartDescription] = useState('');
  const [sparePartImage, setSparePartImage] = useState('');
  const [modelOfVehiclePart, setModelOfVehiclePart] = useState('');
  const [nameOfPart, setNameOfPart] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      sparePartDescription,
      sparePartImage,
      modelOfVehiclePart,
      nameOfPart,
    };

    if (selectedFile) {
      const dataForm = new FormData();
      dataForm.set('file', selectedFile);

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: dataForm,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            data.sparePartImage = link;
          });
        }
        throw new Error('Image upload failed');
      });

      await toast.promise(uploadPromise, {
        loading: 'Uploading image...',
        success: 'Image uploaded successfully!',
        error: 'Failed to upload image',
      });
    }

    try {
      const response = await fetch('/api/spare-part-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Request submitted successfully!');
        setSparePartDescription('');
        setSparePartImage('');
        setModelOfVehiclePart('');
        setNameOfPart('');
        setSelectedFile(null);
      } else {
        toast.error('Failed to submit request. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Toaster />
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Spare Part Request Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spare Part Image
            </label>
            <EditableImage
              link={sparePartImage}
              setLink={setSparePartImage}
              setSelectedFile={setSelectedFile}
            />
          </div>
          <div>
            <label
              htmlFor="sparePartDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Spare Part Description
            </label>
            <textarea
              id="sparePartDescription"
              value={sparePartDescription}
              onChange={(e) => setSparePartDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              rows="4"
              required
            />
          </div>
          <div>
            <label
              htmlFor="modelOfVehiclePart"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Model of Vehicle Part
            </label>
            <input
              type="text"
              id="modelOfVehiclePart"
              value={modelOfVehiclePart}
              onChange={(e) => setModelOfVehiclePart(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="nameOfPart"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name of Part
            </label>
            <input
              type="text"
              id="nameOfPart"
              value={nameOfPart}
              onChange={(e) => setNameOfPart(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}