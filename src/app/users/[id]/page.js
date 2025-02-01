'use client';
import { useProfile } from "../../../components/UseProfile";
import UserForm from "../../../components/layout/UserForm";
import UserTabs from "../../../components/layout/UserTabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/profile?_id=' + id);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, [id]);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (response.ok) {
        toast.success('User saved');
      } else {
        toast.error('An error has occurred while saving the user');
      }
    } catch (error) {
      toast.error('An error has occurred while saving the user');
    }
  }

  if (loading) {
    return 'Loading user profile...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl px-4">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}