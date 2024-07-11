"use client"
import { CartContext } from "../../components/AppContext";
import MenuItemTile from "../../components/menu/MenuItemTile";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";


export default function MenuItem(menuItem) {
  const {
    image,
    name,
    description,
    basePrice,
    sizes,
    extraIngredientPrices,
    quantity,
    // category,
    // _id
  } = menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedQty, setSelectedQty] = useState(quantity || 1);

  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleAddToCartButtonClick() {
    console.log("add to cart");
    const hasOptions =
      (sizes || []).length > 0 ||
      (extraIngredientPrices || []).length > 0 ||
      (quantity || []).length > 0;

    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(
      menuItem,
      selectedSize,
      selectedExtras,
      selectedPrice,
      selectedQty
    );

    try {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...menuItem,
          extraIngredientPrices: selectedExtras,
          sizes: selectedSize,
          totalProductQty: selectedQty,
          totalPriceOfProduct: selectedPrice,
        }),
      });
      if (response.ok) {
        toast.success(`${name} added to your order!`, {
          position: "top-right", // You can choose other positions like 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center', or 'center'
        });
      } else {
        console.error("Error adding to cart");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowPopup(false);
    }
  }


  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  // increaseQuantity()

  function increaseQuantity() {
    setSelectedQty((prevQuantity) => prevQuantity + 1);
  }

  function decreaseQuantity() {
    if (selectedQty === 1) {
      return;
    }
    setSelectedQty((prevQuantity) => prevQuantity - 1);
  }

  // function handleQuantityChange(event) {
  //   const newQuantity = parseInt(event.target.value, 10);
  //     setSelectedQty(newQuantity);
  // }

  const handleQuantityChange = (ev) => {
    setSelectedQty(parseInt(ev.target.value));
  };

  let selectedPrice = basePrice;
  // if (selectedQty) {
  //   selectedPrice = (basePrice) * (selectedQty);
  // }
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  selectedPrice = selectedPrice * selectedQty;

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md"
          >
            <div
              className="overflow-y-scroll p-2 relative"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                priority
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                // style ={{objectFit: "coontain"}}
                className="mx-auto"
                // objectFit="contain"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"
                      />
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}

              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {extraIngredientPrices.map((extraThing) => (
                    <label
                      key={extraThing._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="checkbox"
                        onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                        checked={selectedExtras
                          .map((e) => e._id)
                          .includes(extraThing._id)}
                        name={extraThing.name}
                      />
                      {extraThing.name} +${extraThing.price}
                    </label>
                  ))}
                </div>
              )}

              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-center text-gray-700 py-2">
                  Update the Quantity
                </h2>
                <div className="grid grid-cols-3 gap-4 py-4">
                  <span className="text-xs text-gray-500">
                    input the number of items that you need here
                  </span>
                  <input
                    type="number"
                    value={selectedQty}
                    onChange={handleQuantityChange}
                    className="flex-1 border rounded-md p-2"
                  />
                </div>
                <div className="flex items-center justify-between w-full">
                  <button
                    className="w-10 h-10 rounded-full border border-gray-300 bg-blue-300 text-lg flex items-center justify-center cursor-pointer transition hover:bg-gray-100 py-2 mx-5"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                  <span className="flex items-center gap-2 p-4 border rounded-md mb-1">
                    {selectedQty}
                  </span>
                  <button
                    className="w-10 h-10 rounded-full border border-gray-300 bg-blue-300 text-lg flex items-center justify-center cursor-pointer transition hover:bg-gray-100 py-2 mx-5"
                    disabled={selectedQty === 1}
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                </div>
                <p className="text-center py-5">{selectedQty}</p>
              </div>

              {categories?.length > 0 &&
                categories.map(
                  (c) =>
                    c.name === "wiper" && (
                      <div className="bg-white p-4 rounded-md shadow-md"  key={uuidv4()}>
                        <h2 className="text-center text-gray-700 py-2">
                          Update the Quantity
                        </h2>
                        <h4 className="text-center text-gray-700 py-1">
                          (1 set = 2 wipers)
                        </h4>
                        <div className="grid grid-cols-3 gap-4 py-4">
                          <span className="text-xs text-gray-500">
                            input the number that you need here
                          </span>
                          <input
                            type="number"
                            value={selectedQty}
                            onChange={handleQuantityChange}
                            className="flex-1 border rounded-md p-2"
                          />
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <button
                            className="w-10 h-10 rounded-full border border-gray-300 bg-blue-300 text-lg flex items-center justify-center cursor-pointer transition hover:bg-gray-100 py-2 mx-5"
                            onClick={increaseQuantity}
                          >
                            +
                          </button>
                          <span className="flex items-center gap-2 p-4 border rounded-md mb-1">
                            {selectedQty}
                          </span>
                          <button
                            className="w-10 h-10 rounded-full border border-gray-300 bg-blue-300 text-lg flex items-center justify-center cursor-pointer transition hover:bg-gray-100 py-2 mx-5"
                            disabled={selectedQty === 1}
                            onClick={decreaseQuantity}
                          >
                            -
                          </button>
                        </div>
                        <p className="text-center py-5">
                          {selectedQty >= 100
                            ? `${selectedQty / 100} bags (${selectedQty} sets)`
                            : `${selectedQty} sets`}
                        </p>
                      </div>
                    )
                )}

              <button
                className="primary sticky bottom-2"
                onClick={handleAddToCartButtonClick}
              >
                Add to cart ${selectedPrice}
              </button>

              <button className="mt-2" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
