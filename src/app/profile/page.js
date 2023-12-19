'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// useRouter
export default function ProfilePage() {
    const router = useRouter();
    const session = useSession();
    const [userName, setUserName] = useState(session?.data?.user?.name || '' )
    let {status} = session;
    // console.log('session4Profile', session?.data?.user?.image)

        useEffect(() => {
            if(status === 'authenticated') {
                setUserName(session?.data?.user?.name)
            }
        }, [session, status]);

     const handleProfileInputUpdate = (e) => {
        e.preventDefault();
        fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: userName}),

        })
    }

    if(status === 'loading') {
        return 'Loading...'
    }

    if(status === 'unauthenticated'){
        router.push('/login');
    }

    const userImage = session?.data?.user?.image
    return (
        <section className='mt-8'>
            <h1 className="text-center text-primary text-4xl mb-4">
        Profile
      </h1>
      <div className='max-w-md mx-auto'>
        <div className="flex gap-4 items-center">
        <div>
            <div className="p-2 rounded-lg relative">
                
                    <Image className="rounded-lg h-full w-full mb-1" src={userImage} height={250} width={250} alt="avatar" />

    
         <button type="button">Edit</button>
         </div>
        </div>
        <form className="grow" onSubmit={handleProfileInputUpdate}>
            <input type="text" placeholder=" First and last name" value={userName} onChange={e => setUserName(e.target.value) } />
            <input type="email" disabled={true} value={session?.data?.user?.email}/>
            <button type="submit">Save</button>
        </form>
        </div>
      </div>
        </section>
    )
}