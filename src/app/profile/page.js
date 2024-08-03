'use client';
import EditableImage from "../../components/layout/EditableImage";
import InfoBox from "../../components/layout/InfoBox";
import SuccessBox from "../../components/layout/SuccessBox";
import UserForm from "../../components/layout/UserForm";
import UserTabs from "../../components/layout/UserTabs";

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const session = useSession();

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const {status} = session;

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdateWithImage(ev, data) {
    ev.preventDefault();

    try {
      // Check if there is an image to upload
      if (selectedFile) {
        const dataForm = new FormData();
        dataForm.set('file', selectedFile);
        console.log("selectedfile", selectedFile);

        const uploadPromise = fetch('/api/upload', {
          method: 'POST',
          body: dataForm,
        }).then(response => {
          if (response.ok) {
            return response.json().then(link => {
              data.image = link; // Add the uploaded image link to the data object
              console.log("link00", link)
            });
          }
          throw new Error('Image upload failed');
        });

        await toast.promise(uploadPromise, {
          loading: 'Uploading image...',
          success: 'Image uploaded',
          error: 'Upload error',
        });
      }
      
      const savingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        });
        if (response.ok)
          resolve();
        else
          reject();
      });

      await toast.promise(savingPromise, {
        loading: 'Saving...',
        success: 'Profile saved!',
        error: 'Error saving profile',
      });

    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating the profile.');
    }
  }

  if (status === 'loading' || !profileFetched) {
    return 'Loading profile...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdateWithImage} setSelectedFile={setSelectedFile}/>
      </div>
    </section>
  );
}
