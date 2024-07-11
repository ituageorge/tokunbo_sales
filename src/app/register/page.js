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
        <section className="mt-8">
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
<form className="block max-w-xl mx-auto " onSubmit={handleFormSubmit}>

    <input type='email' placeholder="email" value={email} 
    disabled={creatingUser}
    onChange={e => setEmail(e.target.value)} />
    <input type='password' placeholder="password" value={password}
    disabled={creatingUser}
    onChange={e => setPassword(e.target.value)}/>
    <button type="submit" >Register</button>
<div className="my-4 text-center text-gray-500">
or login with provider
</div>
<button onClick={() => signIn('google', {callbackUrl: '/'})} className="flex gap-4 justify-center">
<Image src={'/google-logo-png.png'} width={24} height={24} alt={'Log in with google'} />
Login with google
</button>
<div className="text-center my-4 text-gray-500 border-t pt-4">
    Existing account? {' '} 
    <Link href={"/login"}> Login here &raquo;</Link>
</div>
</form>
        </section>
    )
}