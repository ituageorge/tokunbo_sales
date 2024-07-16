export default function SectionHeaders({subHeader, minorHeader, mainHeader}) {
    return (
      <>
        <h3 className="uppercase text-gray-500 font-semibold leading-4">
          {subHeader} 
        </h3>
        <h3 className="uppercase text-primary font-semibold leading-4">
          {minorHeader} 
        </h3>
        <h2 className="text-primary font-bold text-4xl italic">
          {mainHeader}
        </h2>
      </>
    );
  }