'use client';
import { useState } from 'react'; // Fixed typo from 'eact' to 'react'
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }

  return (
    <section className="mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-primary text-4xl mb-4">Reset Password</h1>
      <form className="flex flex-col space-y-4 w-full max-w-sm mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="token"
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="submit" className="bg-primary text-white rounded-md p-2 hover:bg-primary-dark transition">
          Reset Password
        </button>
        {success && (
          <div className="my-4 text-center text-green-500">
            Password reset successful! You can now login with your new password.
          </div>
        )}
        {error && (
          <div className="my-4 text-center text-red-500">
            Error resetting password. Try again later...
          </div>
        )}
      </form>
      <div className="text-center my-4 text-gray-500">
        <Link href="/login" className="hover:underline">Back to login</Link>
      </div>
    </section>
  );
}