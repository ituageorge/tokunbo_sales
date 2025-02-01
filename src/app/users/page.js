'use client';
import { useProfile } from "../../components/UseProfile";
import UserTabs from "../../components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/users').then(response => {
      response.json().then(users => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return 'Loading user info...';
  }

  if (data && !data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="max-w-2xl mx-auto mt-8 px-4">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 && users.map(user => (
          <div
            key={user._id}
            className="bg-gray-100 rounded-lg mb-2 p-4 flex flex-col md:flex-row items-center gap-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
              <div className="text-gray-900">
                {!!user.name && <span>{user.name}</span>}
                {!user.name && <span className="italic">No name</span>}
              </div>
              <span className="text-gray-500">{user.email}</span>
            </div>
            <div className="flex gap-2">
              <Link className="button bg-green-300 px-4 py-2 rounded-lg text-sm" href={'/users/' + user._id}>
                Edit
              </Link>
              <Link className="button bg-red-300 px-4 py-2 rounded-lg text-sm" href={'/debt/' + user._id}>
                Debt
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}