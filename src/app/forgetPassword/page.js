'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setSent(false);
    setError(false);
    try {
      const response = await fetch('/api/forget-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }

  return (
    <section className="mt-8 px-4">
      <h1 className="text-center text-primary text-4xl mb-4">
        Forgot Password
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Send Reset Link
        </button>
        {sent && (
          <div className="my-4 text-center text-green-500">
            Reset link sent to your email!
          </div>
        )}
        {error && (
          <div className="my-4 text-center text-red-500">
            Error sending reset link. Try again later...
          </div>
        )}
      </form>
      <div className="text-center my-4 text-gray-500">
        <Link
          href="/login"
          className="text-blue-500 hover:underline"
        >
          Back to login
        </Link>
      </div>
    </section>
  );
}