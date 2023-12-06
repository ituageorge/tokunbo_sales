// import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Link from "next/link";

export default function Home() {
  return (
   
   <>
   {/* <Header /> */}
   <Hero />
   <HomeMenu />
   <section className="text-center my-16">
      <SectionHeaders
        subHeader={'Our story'}
        mainHeader={'About us'}
        />

<div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
   <p className="">
  Lorem ipsum dolor sit gukfgfyu bgu jmbuyg hghjkh hbfh amet, consectetur adipiscing elit. Sed nec diam ultricies, ornare mass
</p>
<p className="">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec diam ultricies, ornare mass
</p>
<p className="">
  Kdhdhj lorem ipsum dolor sit amet, adipiscing elit. Sed nec diam ultricies, mass
</p>
   </div>
   </section>
   <section className="text-center my-8">
    <SectionHeaders 
    subHeader={'Don\'t hesitate'}
    mainHeader={'Contact us'}
    />
    <div className="mt-8">
    <a className="text-4xl underline text-gray-500" href="+2348062701633">+234 806 270 1633</a>
    </div>
   </section>
   
   </>
  )
}
