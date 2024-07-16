import Right from "../../components/icons/Right";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
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
        <p className="text-gray-500 text-sm">
         Looking for a specific item not available on our web page? Fill out our request form, and we'll search for the item for you.
        </p>
        <div className="flex gap-4 text-sm">
        <Link href="/spare-part-request-form">
            <button className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full">
               Request Form 
              <Right />

            </button>
          </Link>
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