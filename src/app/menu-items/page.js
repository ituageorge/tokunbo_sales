'use client';
// import { useProfile } from "../components/UseProfile";
import {useProfile} from '../../components/UseProfile';
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
      })
    })
  }, []);

// console.log('data', data)
// const {admin} = data;

  if (loading) {
    return 'Loading user info...';
  }

  if (data && !data.admin) {
   return 'Not an admin.';
 }
 
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className='button flex'
          href={'/menu-items/new'}>
           <span>Create new menu item</span> 
            <Right />
          </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-4">Edit Menu Item:</h2>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {
          menuItems?.length > 0 && menuItems.map(item => (
            <Link href={'/menu-items/edit/'+item._id} className="bg-gray-300 rounded-lg p-4"
            key={item._id}
            >
              <div className="relative">
              <Image className="rounded-md" src={item.image} alt={''} width={300} height={200}/>
              </div>
              <div className="text-center">
              {item.name}
              </div>          
            </Link>
          ) )
        }
        </div>      
      </div>
    </section>
  );
}