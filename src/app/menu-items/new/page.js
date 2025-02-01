'use client';
import Left from "../../../components/icons/Left";
import MenuItemForm from "../../../components/layout/MenuItemForm";
import UserTabs from "../../../components/layout/UserTabs";
import { useProfile } from "../../../components/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();
  const [selectedFile, setSelectedFile] = useState(null);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();

    // Check if there is an image to upload
    if (selectedFile) {
      const dataForm = new FormData();
      dataForm.set('file', selectedFile);
      console.log("selectedfile", selectedFile);

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: dataForm,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            data.image = link; // Add the uploaded image link to the data object
            console.log("uploadMenuImage", link);
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
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.error);
      }
      toast.success('Saved');
      setRedirectToItems(true);
    } catch (error) {
      console.error(error);
      toast.error('Error');
    }
  }

  if (redirectToItems) {
    return redirect('/menu-items');
  }

  if (loading) {
    return <div className="text-center text-gray-500">Loading menu info...</div>;
  }

  if (data && !data.admin) {
    return <div className="text-center text-gray-500">Not an admin.</div>;
  }

  return (
    <section className="mt-8 px-4">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link
          href={'/menu-items'}
          className="button flex items-center gap-2 bg-gray-200 text-black px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <div className="max-w-2xl mx-auto mt-8">
        <MenuItemForm
          menuItem={null}
          onSubmit={handleFormSubmit}
          setSelectedFile={setSelectedFile}
        />
      </div>
    </section>
  );
}