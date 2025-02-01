'use client';
import { useProfile } from '../../components/UseProfile';
import Right from "../../components/icons/Right";
import UserTabs from "../../components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading user info...</div>;
  }

  if (data && !data.admin) {
    return <div className="text-center text-gray-500">Not an admin.</div>;
  }

  return (
    <section className="mt-8 px-4 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          href={'/menu-items/new'}
        >
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div className="mt-8">
        <h2 className="text-sm text-gray-500 mb-4">Edit Menu Item:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems?.length > 0 ? (
            menuItems.map((item) => (
              <Link
                href={'/menu-items/edit/' + item._id}
                className="bg-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow"
                key={item._id}
              >
                <div className="relative aspect-square">
                  <Image
                    className="rounded-md object-cover"
                    src={item.image}
                    alt={item.name}
                    fill
                  />
                </div>
                <div className="text-center mt-2 font-medium">
                  {item.name}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-500">No menu items found.</div>
          )}
        </div>
      </div>
    </section>
  );
}