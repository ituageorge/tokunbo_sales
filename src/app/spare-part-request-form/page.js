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

    // Prepare data object
    const data = {
      sparePartDescription,
      sparePartImage,
      modelOfVehiclePart,
      nameOfPart,
    };

    // Check if there is an image to upload
    if (selectedFile) {
      const dataForm = new FormData();
      dataForm.set('file', selectedFile);
      console.log("selectedFile", selectedFile);

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: dataForm,
      }).then(response => {
        if (response.ok) {
          return response.json().then(link => {
            data.sparePartImage = link; // Add the uploaded image link to the data object
            console.log("link", link);
          });
        }
        throw new Error('Something went wrong');
      });

      await toast.promise(uploadPromise, {
        loading: 'Uploading image...',
        success: 'Image uploaded',
        error: 'Upload error',
      });
    }

    try {
      const response = await fetch('/api/spare-part-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Request is saved...");

        // Clear the form inputs
        setSparePartDescription('');
        setSparePartImage('');
        setModelOfVehiclePart('');
        setNameOfPart('');
        setSelectedFile(null);
      } else {
        toast.error("Something went wrong... Please try again later");
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while submitting the request.');
    }
  };

  return (
    <div className="bg-gray-50 py-4 flex flex-col justify-center sm:py-4">
      <div className="max-w-lg mx-auto p-4">
        <Toaster />
        <h1 className="text-2xl font-bold mb-4">Spare Part Request Form</h1>
        <form onSubmit={handleSubmit} className="grow space-y-4">
          <div>
            <label htmlFor="sparePartImage" className="block text-sm font-medium text-gray-700">
              Spare Part Image URL
            </label>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              <EditableImage link={sparePartImage} setLink={setSparePartImage} setSelectedFile={setSelectedFile} />
            </div>
          </div>
          <div>
            <label htmlFor="sparePartDescription" className="block text-sm font-medium text-gray-700">
              Spare Part Description
            </label>
            <textarea
              id="sparePartDescription"
              value={sparePartDescription}
              onChange={(e) => setSparePartDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="modelOfVehiclePart" className="block text-sm font-medium text-gray-700">
              Model of Vehicle Part
            </label>
            <input
              type="text"
              id="modelOfVehiclePart"
              value={modelOfVehiclePart}
              onChange={(e) => setModelOfVehiclePart(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="nameOfPart" className="block text-sm font-medium text-gray-700">
              Name of Part
            </label>
            <input
              type="text"
              id="nameOfPart"
              value={nameOfPart}
              onChange={(e) => setNameOfPart(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
