import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
    return(
        <section className="hero mt-4">
            <div className="py-12">
           <h1 className="text-4xl font-semibold">Everything <br />
            is better<br />
             with a&nbsp; <span className="text-primary"> Pizza</span></h1> 

           <p className="my-6 text-gray-500 text-sm">
            Pizza is the missing piece that makes everyday complete, a simple yet delicious joy in life
           </p>
           <div className="flex gap-4 text-sm">
            <button className="px-6 py-3 mt-8 flex gap-2 items-center uppercase bg-primary rounded-md shadow-lg text-white"> Order now
            <Right />
            </button>
            <button className="px-6 py-3 mt-8 flex gap-2 rounded-md shadow-lg text-gray-500 semibold"> Learn more <Right /></button>

           </div>
           </div>
           <div className="relative">
           <Image src={'/pizza.png'} layout="fill" objectFit="contain" alt="pizza" />
           </div>
         </section>
    )
}