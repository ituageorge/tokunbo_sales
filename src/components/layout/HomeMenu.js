import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
// import { Container } from "postcss";

export default function HomeMenu() {
    return(
        <section className="">
            <div className="absolute left-0 right-0 w-full ">
                <div className="absolute left-0 -top-[100px] text-left -z-10">
                    <Image src={'/sallad1.png'} width={189} height={189} alt={'sallad 1'} />
                </div>
                <div className=" absolute -top-[100px] right-0 -z-10 ">
                    <Image src={'/sallad2.png'} width={187} height={195} alt={'sallad 2'} />
                </div>
             </div>

             <div className="text-center mb-4">
           <SectionHeaders 
           subHeader={'check out'} 
           mainHeader={'Menu'}
           />
        </div>
        <div className="grid grid-cols-3 gap-4">
        <MenuItem />
         <MenuItem />
          <MenuItem />
           <MenuItem />
            <MenuItem />
             <MenuItem />
        </div>
        </section>
       
    )
}