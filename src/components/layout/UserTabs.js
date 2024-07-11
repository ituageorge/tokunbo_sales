'use client';
import Link from 'next/link';
import {  usePathname } from 'next/navigation';
// import React from 'react';

//  const UserTabs = ({isAdmin}) => {

 function UserTabs ({isAdmin}) {


  
 const path = usePathname();

 return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      <Link
        className={path === '/profile' ? 'active' : ''}
        href={'/profile'}
      >
        Profile
      </Link>
      {isAdmin && (
        <>
         <Link
        className={path === '/cart/cart-order-users' ? 'active' : ''}
        href={'/cart/cart-order-users'}
      >
        Ordered Cart
      </Link>
          <Link
            href={'/categories'}
            const className={path === '/categories' ? 'active' : ''}
          >
            Categories
          </Link>
          <Link
            const href={'/menu-items'}
            className={path.includes('menu-items') ? 'active' : ''}
          >
            Menu Items
          </Link>
          <Link
            const className={path.includes('/users') ? 'active' : ''}
          href={'/users'}
          >
            Users
          </Link>

          <Link
        const className={path === '/debt' ? 'active' : ''}
        href={`/debt/`}
      >
        Debt
      </Link>

        </>
      )}
      <Link
        className={path === '/orders' ? 'active' : ''}
         href={'/orders'}
      >
        Orders
      </Link>
     
    </div>
 );
}

export default UserTabs;