'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ShowRequestPage() {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (requestId) {
      fetch(`/api/spare-part-request/particular-request?id=${requestId}`)
        .then(res => res.json())
        .then(data => {
          setRequest(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching request:', err);
          setLoading(false);
        });
    }
  }, [requestId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!request) {
    return <div>Request not found</div>;
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-2">
        <h1 className="text-2xl font-bold">Request Details</h1>
        <Link href="/requests">
          <p className="text-blue-500 hover:underline">Back to requests</p>
        </Link>
      </div>
      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">{request.nameOfPart}</h2>
        <p><strong>Description:</strong> {request.sparePartDescription}</p>
        <p><strong>Model of Vehicle Part:</strong> {request.modelOfVehiclePart}</p>
        <Image 
          src={request.sparePartImage} 
          width={300} 
          height={300} 
          alt="Spare Part" 
          className="w-full h-auto mt-4 rounded-md shadow-sm" 
        />
        <p className="text-gray-500 mt-4">
          <strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}
        </p>
        <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">User  Information</h3>
          <Image 
            src={request.image} 
            alt="User " 
            width={100} 
            height={100} 
            className="w-24 h-24 mt-4 rounded-full mx-auto" 
          />
          <p><strong>Name:</strong> {request.name}</p>
          <p><strong>City:</strong> {request.city}</p>
          <p><strong>Country:</strong> {request.country}</p>
          <p><strong>Phone:</strong> {request.phone}</p>
          <p><strong>Postal Code:</strong> {request.postalCode}</p>
          <p><strong>Street Address:</strong> {request.streetAddress}</p>
        </div>
      </div>
    </section>
  );
}