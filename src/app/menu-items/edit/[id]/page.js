'use client';
import { DeleteButton } from "../../../../components/buttonComponent/DeleteRowButton";
import { useProfile } from "../../../../components/UseProfile";
import Left from "../../../../components/icons/Left";
import MenuItemForm from "../../../../components/layout/MenuItemForm";
import UserTabs from "../../../../components/layout/UserTabs";
import Link from "next/link";
import {redirect, useParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";


export default function EditMenuItemPage() {

  const {id} = useParams();

  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const {loading, data} = useProfile();

  useEffect(() => {
    fetch('/api/menu-items').then(res => res.json()).then(items => {
      const item = items.find(i => i?._id === id);
      setMenuItem(item);
    })
  }, [id]);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = {...data, _id:id};
    try {
      const response = await fetch('/api/menu-items', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Error saving menu item');
      }
      toast.success('Saved');
      setRedirectToItems(true);
    } catch (error) {
      console.error(error);
      toast.error('Error');
    }
  }

  async function handleDeleteClick() {
    try {
      const response = await fetch('/api/menu-items?_id='+id, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting menu item');
      }
      toast.success('Deleted');
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
    return 'Loading user info...';
  }

  if (data &&!data.admin) {
    return 'Not an admin.';
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}  />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton
            label="Delete this menu item"
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
}