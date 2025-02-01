'use client';
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn('credentials', { email, password, callbackUrl: '/' });

    setLoginInProgress(false);
  }

  return (
    <section className="mt-8 px-4">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <button
          disabled={loginInProgress}
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          {loginInProgress ? 'Logging in...' : 'Login'}
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Image
            src={'/google-logo-png.png'}
            alt={'Log in with Google'}
            width={24}
            height={24}
          />
          Login with Google
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">
            Forgot Password?{' '}
            <Link
              href="/forget-password"
              className="text-blue-500 hover:underline"
            >
              Reset Password
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}