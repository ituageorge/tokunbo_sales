'use client'

import {CartContext} from "../../components/AppContext";

import Bars2 from "../../components/icons/Bars2";
import ShoppingCart from "../../components/icons/ShoppingCart";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import { usePathname, useRouter } from 'next/navigation';


// function AuthLinks({status, userName}) {
//   const router = useRouter();

//   const handleSignOut = async () => {
//     router.push('/'); // Manually redirect to the sign-in page

//     // signOut(); // Prevent automatic redirect

//      signOut({ redirect: false }); // Prevent automatic redirect
//   };

//   if (status === 'authenticated') {
//     return (
//       <>
//         <Link href={'/profile'} className="whitespace-nowrap">
//           Hello, {userName}
//         </Link>
//         <button
//           onClick={handleSignOut}
//           // onClick={() => signOut()}
//           className="bg-primary rounded-full text-white px-8 py-2">
//           Logout
//         </button>
//       </>
//     );
//   }
//   if (status === 'unauthenticated') {
//     handleSignOut();
//     return (
//       <>
//         <Link href={'/login'}>Login</Link>
//         <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
//           Register
//         </Link>
//       </>
//     );
//   }
// }

export default function Header() {
  const session = useSession();
  const router = useRouter();
  const path = usePathname()
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const {cartProducts} = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleSignOut = async () => {
    router.push('/'); // Manually redirect to the sign-in page

    // signOut(); // Prevent automatic redirect

     signOut({ redirect: false }); // Prevent automatic redirect
  };
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  useEffect(() => {
    setMobileNavOpen(false) 
  }, [path])
  useEffect(() => {
    if (status === 'unauthenticated') {
      handleSignOut();
    }
  }, [status])
  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href={'/'}>
         MY TOKUNBO SPAREPARTS 
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => {setMobileNavOpen(prev => !prev)}}>
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          // onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
          {/* <AuthLinks status={status} userName={userName} /> */}
          {status === 'authenticated'? <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={handleSignOut}
          // onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2">
          Logout
        </button>
      </>: <>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
          Register
        </Link>
      </>}
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
          MY TOKUNBO SPAREPARTS 
          </Link>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          {/* <AuthLinks status={status} userName={userName} /> */}
          {status === 'authenticated'? <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={handleSignOut}
          // onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2">
          Logout
        </button>
      </>: <>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
          Register
        </Link>
      </>}
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}