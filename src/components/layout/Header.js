'use client';
// Import necessary modules
import { useSession } from 'next-auth/react';
import { signOut, getSession, isUnauthenticated } from 'next-auth/react';
import Link from 'next/link';
// import { useState } from 'react';

// Define the Header component
export default function Header() {

   // Use the useSession hook to get the session data and status
   const { data: session, status } = useSession();

//    // Check if session is defined before accessing properties
// if (!session) {
//   // Handle the case where session is not defined, e.g., redirect or show an error
//   return null
// }

   console.log('session', session?.user);
   console.log('status', status);

    // Extract user data from the session
   const userData = session?.user;
   let userName = userData?.name || userData?.email;

  // Process the username to remove spaces
  if (userName?.includes(' ')) {
    userName = userName.split(' ')[0];
  }

   // Render the header component
    return(
        <header className="flex items-center justify-between">
      <Link className='text-primary font-semibold text-2xl' href={"/"}>ST PIZZA</Link>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
   
        <Link href={'/'}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>        
      </nav>

      {/* If the user is authenticated show a logout button */}
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">

       {/* Check if the user is authenticated */}
      {status === 'authenticated' && (
          // If authenticated, render the logout button

          <>
          <Link href={'/profile'} className='whitespace-nowrap'>Hello, {userName}</Link>
        <button type='button'
        onClick={() => signOut()}
        className="bg-primary rounded-md text-white px-6 py-2">Logout</button>
        </>
     )}

      {/* Check if the user is unauthenticated */}
       {status === 'unauthenticated' && (
      <>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-primary rounded-md text-white px-6 py-2">Register</Link>  
      </>
     )}  
    </nav>
    </header>
    )
}