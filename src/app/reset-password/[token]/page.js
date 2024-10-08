"use client";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
// import Email from "next-auth/providers/email";

const ResetPassword = (params) => {
  // console.log(params.token);
  const router = useRouter();
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
// const [user, setUser] = useState(null);
  // const session = useSession();
  const { status: sessionStatus } = useSession();
  const search = useSearchParams();
  const email = search.get('email')

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
          setVerified(true)
        }
        if (res.status === 200) {
          setError("");
          setVerified(true)
          // const userData = await res.json();
          // setUser(userData);
        }
      } catch (error) {
        setError("Error, try again");
        console.log(error);
      }
   }
   verifyToken();
  }, []);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus]);

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
          email
        }),
      });
      if (res.status === 400) {
        setError("Something went wrong, try again");
      }
      if (res.status === 200) {
        setError("");
       router.push("/login");
       toast.success('Reset Password Successful!')
      }
    } catch (error) {
      setError("Error, try again");
      toast.error("Error, try again");
      console.log(error);
    }

  };

  if (sessionStatus === "loading" || verified) {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8 text-gray-300">Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
          
            <button
              type="submit"
              disabled={error.length > 0}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              Reset Password
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          
          </div>
          </div>
        )
      );
    };
    

export default ResetPassword;
