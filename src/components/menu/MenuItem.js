export default function MenuItem() {
    return(
        <div className="bg-gray-200 p-4 rounded-md text-center group hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all">
               <div className="text-center ">
               <img src="/pizza.png" className=" max-h-24 mx-auto block" alt="pizza" />
               </div>
                <h4 className="font-semibold text-xl my-3">Pepperoni Pizza</h4>
                <p className="text-gray-500 text-sm">Lorem ipsum dolor hfvffvdfhvf fjhfg aehjgeyu eyghweg eyhgewui eryuwehreufuyyy gf
                    fyfdtk fbufygfyf fdehfgyu euhihfoweiughoy ewuhuoguighfdwhy fghudus eyfo iue eiu 
                    fftyfyii tyfy 
                </p>
                <button className="mt-4 bg-primary text-white rounded-md px-6 py-2">Add to cart $12</button>
        </div> 
    )
}