"use client";
import {signIn} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [creatingUser, setCreatingUser] = useState(false)
const [userCreated, setUserCreated] = useState(false)
const [error, setError] = useState(false);

async function handleFormSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
      setUserCreated(true);
      toast.success("Success")
    }
    else {
      setError(true);
    }
    setCreatingUser(false);
  }

    return(
        <section className="mt-8 px-4 sm:px-6 lg:px-8">
            <h1 className=" mt-4 text-center text-primary text-4xl">Register</h1>

    {userCreated && (
        <div className='my-4 text-center'>
            User created.<br/>
             Now you can {' '}
            <Link className="underline" href={'/login'}> login &raquo;</Link>
        </div>
    )}
    {error && (
        <div className='my-4 text-center'>
            Error creating user<br/>
            Try again later...
        </div>
      )}

 <form className="block max-w-xl mx-auto" onSubmit={handleFormSubmit}>
        <input
          type='email'
          placeholder="Email"
          value={email}
          disabled={creatingUser }
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-4"
        />
        <input
          type='password'
          placeholder="Password"
          value={password}
          disabled={creatingUser }
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-4"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark transition"
        >
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex gap-2 justify-center items-center w-full bg-white border border-gray-300 p-2 rounded-md hover:shadow transition"
        >
          <Image src={'/google-logo-png.png'} width={24} height={24} alt={'Log in with Google'} />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account? {' '}
          <Link href={"/login"}> Login here &raquo;</Link>
        </div>
      </form>
        </section>
    )
}