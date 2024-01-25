"use client";
import EditableImage from "@/components/layout/EditableImage";
import InfoBox from "@/components/layout/InfoBox";
import UserTabs from "@/components/layout/UserTabs";
// import { data } from "autoprefixer";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const session = useSession();
  console.log(session);
  const [userName, setUserName] = useState(session?.data?.user?.name || "");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  let { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session?.data?.user?.name);
      setImage(session?.data?.user?.image);

      fetch("/api/profile")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // console.log('data', data);
          // Update state with the received data
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
          // Handle the error, e.g., show a user-friendly message
        });
    }
  }, [session, status]);

  const handleProfileInputUpdate = async (e) => {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          image,
          streetAddress,
          phone,
          postalCode,
          city,
          country,
        }),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: <b>Profile updated!</b>,
      error: <b>Failed to update profile.</b>,
    });
  };

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-4 ">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              <EditableImage link={image} setLink={setImage} />
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInputUpdate}>
            <label>First and last name</label>
            <input
              type="text"
              placeholder=" First and last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              disabled={true}
              value={session?.data?.user?.email}
              placeholder="Email"
            />

            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              // value={session?.data?.user?.phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label>Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />

            <div className="flex gap-4">
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <label>Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>

            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
