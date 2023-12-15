'use client';
// Import necessary modules
import { useSession } from 'next-auth/react';
import { signOut, getSession, isUnauthenticated } from 'next-auth/react';
import Link from 'next/link';

// Define the Header component
export default function Header() {

   // Use the useSession hook to get the session data and status
   const { status } = useSession();
   const { data: session } = getSession();
  //  console.log('seession', session)
   console.log('statuss', status)


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
        <button
        onClick={() => signOut()}
        className="bg-primary rounded-md text-white px-6 py-2">Logout</button>
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