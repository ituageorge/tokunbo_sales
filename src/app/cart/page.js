"use client";
import { CartContext, cartProductPrice } from "../../components/AppContext";
import AddressInputs from "../../components/layout/AddressInputs";
import SectionHeaders from "../../components/layout/SectionHeaders";
import CartProduct from "../../components/menu/CartProduct";
import { useProfile } from "../../components/UseProfile";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
  const session = useSession();
  const { status } = session;
  const { clearCart, cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();
  const router = useRouter();

  const userId = profileData?.userId;
  const userData = session.data?.user;
  const userName = userData?.name || userData?.email;
  const userImage = userData?.image;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function handleCartToOrder() {
    if (status !== "authenticated") {
      toast.error("You need to be logged in to place an order.");
      return;
    }

    try {
      const response = await fetch("/api/cart-no-mobilePay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
          subtotal,
          userId,
          userName,
          userImage,
        }),
      });

      if (response.ok) {
        toast.success("Data posted to database successfully!");
        clearCart();
        router.replace(`/cart/cart-display/${userId}`);
      } else {
        toast.error("Error posting data to database");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error posting data to database");
    }
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();

    if (status !== "authenticated") {
      toast.error("You need to be logged in to proceed to checkout.");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      });

      if (response.ok) {
        toast.success("Redirecting to payment...");
        window.location = await response.json();
      } else {
        toast.error("Something went wrong... Please try again later");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong... Please try again later");
    }
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center px-4">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4 text-gray-600">Your shopping cart is empty 😔</p>
        <Link href="/menu" className="text-blue-500 hover:underline">
          Browse our menu
        </Link>
      </section>
    );
  }

  return (
    <section className="mt-8 px-4">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={index}
                index={index}
                product={product}
                onRemove={removeCartProduct}
              />
            ))}
          <div className="py-2 pr-4 lg:pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              &#8358;{subtotal}
              <br />
              &#8358;2000
              <br />
              &#8358;{subtotal + 2000}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button
              disabled={status !== "authenticated"}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
              type="submit"
            >
              Pay &#8358;{subtotal + 2000}
            </button>
          </form>
          <div className="mt-5">
            <button
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
              onClick={handleCartToOrder}
              disabled={status !== "authenticated"}
            >
              Place your Order (and pay with POS)
            </button>
            {status !== "authenticated" && (
              <p className="text-red-500 mt-2 text-center">
                <Link href="/login" className="hover:underline">
                  Please log in to place an order.
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}