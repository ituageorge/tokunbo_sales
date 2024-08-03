// import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            At Ladipo Market, we pride ourselves on providing a wide range of genuine vehicle parts and accessories. Our market has built a reputation for reliability and quality, ensuring that every part you purchase meets the highest standards.
          </p>
          <p>
            We understand the importance of using authentic parts to maintain the performance and longevity of your vehicle. That&apos;s why we source our products directly from trusted manufacturers, offering you peace of mind and excellent value for your money.
          </p>
          <p>
            Whether you&apos;re a professional mechanic or a car enthusiast, our market is your one-stop destination for all your automotive needs. From engines and brakes to electronics and body parts, we have everything you need to keep your vehicle in top condition.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\' t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href=" +234 8062701633">
            +234 8062701633
          </a>
        </div>
      </section>
    </>
  )
}