export default function SectionHeaders({subHeader, mainHeader}) {
    return(
        <div className="section-headers">
        <h3 className="uppercase text-gray-500 font-semibold leading-4">{subHeader}</h3>
        <h2 className="italic text-primary font-bold text-4xl">{mainHeader}</h2>
        </div>
    )
}