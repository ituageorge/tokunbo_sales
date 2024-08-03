"use client"
import Right from "../../components/icons/Right";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function Hero() {
  const router = useRouter()
  const { status } = useSession(); // Get the user's authentication status
  const isAuthenticated = status === "authenticated"; // Determine if the user is authenticated

  const handleRequestFormClick = (e) => {
    if (!isAuthenticated) {
      // e.preventDefault(); // Prevent the default action of the link
      toast.error("Please log in to access the request form.");
    } else {
      router.push("/spare-part-request-form")
    }
  };

  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Everything<br />
          is better<br />
          in 
          <span className="text-primary px-2">
            Ladipo Market
          </span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Get your authentic vehicle parts and accessories here.
        </p>
        <p className="text-gray-500 my-2 text-sm">
          Looking for a specific item not available on our web page? Fill out our request form, and we&apos;ll search for the item for you.
        </p>
        <div className="flex gap-4 text-sm">
          {/* <Link href="/spare-part-request-form"> */}
            <button
             onClick={handleRequestFormClick}
              type="button"
              className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full"
              // disabled={!isAuthenticated} // Disable the button if the user is not authenticated
            >
              Request Form 
              <Right />
            </button>
          {/* </Link> */}
          <Link href="/">
            <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
              Learn more
              <Right />
            </button>
          </Link>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image src={'/pngwing.com.png'} layout={'fill'} objectFit={'contain'} alt={'engine'} />
      </div>
    </section>
  );
}
