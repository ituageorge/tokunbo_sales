'use client';
import UserForm from "../../components/layout/UserForm";
import UserTabs from "../../components/layout/UserTabs";

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const {status} = session;

  async function fetchProfile() {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      // console.log("ddaatta", data);
      setUser(data);
      setIsAdmin(data.admin);
      setProfileFetched(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [session, status]);
  

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success('Profile saved!');
      } else {
        toast.error('Error');
      }
    } catch (error) {
      toast.error('Error');
    }
  }

  if (status === 'loading' || !profileFetched) {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}