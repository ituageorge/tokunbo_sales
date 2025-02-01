'use client';
import SectionHeaders from '../../components/layout/SectionHeaders';
import UserTabs from '../../components/layout/UserTabs';
import { useProfile } from '../../components/UseProfile';
import { dbTimeForHuman } from '../../libs/datetime';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loadingRequest, setLoadingRequest] = useState(true);
  const { data: profile } = useProfile();

  useEffect(() => {
    async function fetchRequests() {
      setLoadingRequest(true);
      try {
        const res = await fetch('/api/spare-part-request');
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setRequests(data.reverse());
        } else {
          console.error('API response is not an array:', data);
          setRequests([]);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
        setRequests([]);
      } finally {
        setLoadingRequest(false);
      }
    }

    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    setLoadingRequest(true);
    try {
      const res = await fetch(`/api/spare-part-request?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setRequests(requests.filter(request => request._id !== id));
      } else {
        console.error('Failed to delete request');
      }
    } catch (error) {
      console.error('Error deleting request:', error);
    } finally {
      setLoadingRequest(false);
    }
  };

  return (
    <section className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-2">
        <SectionHeaders mainHeader="Requests" />
      </div>
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingRequest && <div>Loading Requests...</div>}
        {requests.length > 0 ? (
          requests.map(request => (
            <div
              key={request._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="grow flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow">{request.sparePartDescription}</div>
                    <div className="text-gray-500 text-sm">{dbTimeForHuman(request.createdAt)}</div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {request.modelOfVehiclePart}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center whitespace-nowrap">
                <Link href={`/requests/${request._id}`}>
                  <b className="button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Show request
                  </b>
                </Link>
                <button
                  onClick={() => handleDelete(request._id)}
                  className="button bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No requests found</div>
        )}
      </div>
    </section>
  );
}