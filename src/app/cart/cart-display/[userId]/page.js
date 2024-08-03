"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Image, Chip, Button } from '@nextui-org/react';
import { format } from "date-fns";
import SectionHeaders from '../../../../components/layout/SectionHeaders';
import toast from "react-hot-toast";
import Link from 'next/link';

export default function CartOrdered() {
  const [onlineOrder, setOnlineOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOnlineOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/cart-no-mobilePay');
        const data = await response.json();
        setOnlineOrder(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchOnlineOrder();
  }, []);

  // Add these two functions to handle the button clicks
  const handleDeliver = async (productId) => {
    try {
        const response = await fetch('/api/cart-no-mobilePay', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body:  JSON.stringify({ delivered: true, productId })
        });
        if (!response.ok) {
            throw new Error('Error updating product delivered to true');
        }
        toast.success('Delivered');
        // const data = await response.json();

        // console.log('data123', data);
        // console.log('response123', response);

        // Update the product state to reflect that it's been delivered
        setOnlineOrder((prevOnlineOrder) => {
            const updatedCartProducts = prevOnlineOrder.cartProducts.map((product) => {
                if (product._id.toString() === productId) {
                    product.delivered = true; // Update the delivered field to true
                }
                return product;
            });
            return { ...prevOnlineOrder, cartProducts: updatedCartProducts };
        });
    } catch (error) {
        console.error(error);
        toast.error('Error');
    }
};



const handleDelete = async (productId) => {
  try {
    const response = await fetch('/api/cart-no-mobilePay', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });

    if (!response.ok) {
      throw new Error('Error deleting product');
    }

    const data = await response.json();
    toast.success('Product deleted');

    if (data.message === "Order deleted as there were no products left") {
      setOnlineOrder({});
      toast.success('Order deleted');
    } else {
      setOnlineOrder((prevOnlineOrder) => {
        const updatedCartProducts = prevOnlineOrder.cartProducts.filter((product) => product._id !== productId);
        const updatedSubtotal = prevOnlineOrder.subtotal - data.cartProducts.find((product) => product._id === productId).totalPriceOfProduct;
        return { ...prevOnlineOrder, cartProducts: updatedCartProducts, subtotal: updatedSubtotal };
      });

     
    }
     // Reload the page to reflect changes
     window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error('Error deleting product');
  }
};


  return (
    <React.Fragment>
      <div className='my-5 text-center'>
    <SectionHeaders
          // subHeader={'Online Orders'}
          subHeader={onlineOrder.userName}
        />
        </div>
    <Card
      className="max-w-md mx-auto p-4 rounded-lg shadow-md my-5 border-double border-4 border-red-300"
    >
      <CardHeader
        className="pb-4 pt-6 px-4 border-b border-gray-200"
      >
        <div className="flex items-center text-gray-600">
          <p className="text-sm mr-2">Date Ordered:</p>
          <Chip className="capitalize"  size="sm" variant="flat">
            {format( Date(onlineOrder.createdAt), "MMMM d, yyyy")}         
          </Chip>
        </div>
        <div className="flex items-center text-gray-600 text-4xl font-extrabold antialiased mx-3">
          <p className="text-sm mr-2">Cost:</p>
          <p className="text-sm">{onlineOrder.subtotal}</p>
        </div>
      </CardHeader>
      
      <CardBody
  className="py-6 px-4"
>
  {loading? (
    <p
      className="text-lg text-center text-gray-600"
    >
      Loading...
    </p>
  ) : (
    onlineOrder.cartProducts && onlineOrder.cartProducts.map((product, index) => (
      <div
        key={index}
        className="flex flex-col my-5 items-center border-solid border-4 border-red-300"
      >
        <Image
          alt={product.name}
          className="object-cover rounded-lg shadow-md"
          src={product.image}
          width={270}
        />
        <p
          className="text-lg font-bold text-gray-800 mt-2"
        >
          {product.name}
        </p>
        <p
          className="text-md text-gray-600 mb-2"
        >
          {product.description}
        </p>
        <p
          className="text-lg font-bold text-gray-800"
        >
          Price: {product.basePrice} x {product.totalProductQty} ={' '}
          {product.totalPriceOfProduct}
        </p>
        <div className="flex justify-between m-4">
          {product.delivered? (
            <Button
              auto
              size="sm"
              color="success"
              disabled
            >
              Delivered
            </Button>
          ) : (
            <Button
            auto
            size="sm"
            color="primary"
            onClick={() => handleDeliver(product._id.toString())}
        >
            Deliver
        </Button>
          )}
          {product.delivered && (
            <Button
              auto
              size="sm"
              color="error"
              onClick={() => handleDelete(product._id.toString())}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    ))
  )}
  {error && (
    <p
      className="text-lg text-center text-red-500"
    >
      {error}
    </p>
  )}
</CardBody>

    </Card>
    <div className='text-center'>
        <Link href="/cart/cart-order-users">
          <span className="text-blue-500 hover:underline text-lg">Go Back</span>
        </Link>
      </div>
    </React.Fragment>
  );
}