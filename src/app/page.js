import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <section className="page">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Welcome to our site<br />
          Where you&apos;ll find<br />
          the best parts
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          We&apos;re dedicated to providing you with the best vehicle parts and accessories.
        </p>
        <div className="flex gap-4 text-sm">
          <Link href="/shop">
            <button className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full">
              Shop Now
            </button>
          </Link>
          <Link href="/contact">
            <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image src={'/images/shop.png'} layout={'fill'} objectFit={'contain'} alt={'Shop'} />
      </div>
    </section>
  );
}
