'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function UserTabs({ isAdmin }) {
  let path = usePathname();
  

  return (
    <div className="flex my-5 mx-auto gap-2 tabs justify-center flex-wrap">
      <Link
        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
          path === '/profile' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        href={'/profile'}
      >
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              path === '/cart/cart-order-users' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            href={'/cart/cart-order-users'}
          >
            Ordered Cart
          </Link>
          <Link
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              path === '/categories' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            href={'/categories'}
          >
            Categories
          </Link>
          <Link
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              path.includes('menu-items') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            href={'/menu-items'}
          >
            Menu Items
          </Link>
          <Link
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              path.includes('/users') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            href={'/users'}
          >
            Users
          </Link>
          <Link
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              path === '/debt' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            href={'/debt'}
          >
            Debt
          </Link>
          <Link
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              path === '/requests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            href={'/requests'}
          >
            Requests
          </Link>
        </>
      )}
      <Link
        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
          path === '/orders' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        href={'/orders'}
      >
        Orders
      </Link>
    </div>
  );
}

export default UserTabs;