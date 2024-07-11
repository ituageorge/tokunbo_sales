'use client';
import { useState } from 'eact';
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
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Reset Password</h1>
      <form className="flex flex-col space-y-4 w-64 mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="token"
          placeholder="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
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
        <Link href="/login">Back to login</Link>
      </div>
    </section>
  );
}