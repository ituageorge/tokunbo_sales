"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const ResetPassword = (params) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const { status: sessionStatus } = useSession();
  const search = useSearchParams();
  const email = search.get('email');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: params.token,
          }),
        });
        if (res.status === 400) {
          setError("Invalid token or has expired");
          setVerified(true);
        }
        if (res.status === 200) {
          setError("");
          setVerified(true);
        }
      } catch (error) {
        setError("Error, try again");
        console.log(error);
      }
    };
    verifyToken();
  }, [params.token]);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target[0].value;

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          email,
        }),
      });
      if (res.status === 400) {
        setError("Something went wrong, try again");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
        toast.success('Reset Password Successful!');
      }
    } catch (error) {
      setError("Error, try again");
      toast.error("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading" || !verified) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
        <div className="bg-[#212121] p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-semibold text-center text-gray-300 mb-6">Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="w-full border border-gray-600 text-white bg-gray-700 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              disabled={error.length > 0}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Reset Password
            </button>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          </form>
        </div>
      </div>
    )
  );
};

export default ResetPassword;