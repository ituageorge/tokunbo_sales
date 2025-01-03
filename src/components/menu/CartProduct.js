
// import Trash from "../components/icons/Trash";
import Trash from "../../components/icons/Trash";
import Image from "next/image";
// import { cartProductPrice } from "../AppContext";

export default function CartProduct({product, onRemove, index}) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image width={240} height={240} src={product.image} alt={'product'} />
      </div>
      <div className="grow">
        <h3 className="font-semibold">
          {product.name}
        </h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map(extra => (
              <div key={extra.name}>{extra.name} &#8358;{extra.price}</div>
            ))}
          </div>
        )}
        <div className="text-lg bg-slate-100 font-semibold">
         Qty: <span className="text-green-500">{product.totalProductQty} </span> 
      </div>
      </div>
      
      <div className="text-lg font-semibold">
      &#8358;{product.totalPriceOfProduct}
      </div>
     
      {!!onRemove && (
        <div className="ml-2">
          <button
            type="button"
           
            // onClick={() => onRemove(index)}
            onClick={() => onRemove(index)}
            className="p-2">
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}