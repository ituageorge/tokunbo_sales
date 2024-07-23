"use client"
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuidv4 } from "uuid";
import SectionHeaders from '../../../components/layout/SectionHeaders';

const CartOrdered = () => {
  const [cartOrderData, setCartOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartOrdered = async () => {
      try {
        setLoading(true);
        await fetch('/api/cart-no-mobilePay/cart-order-users')
          .then((res) => res.json())
          .then((data) => setCartOrderData(data));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCartOrdered();
  }, []);

  // console.log("rres123", cartOrderData)

  const columns = [
    {
      key: 'image',
      label: 'IMAGE',
    },
    {
      key: 'name',
      label: 'NAME',
    },
    {
      key: 'phone',
      label: 'PHONE',
    },
  ];

  return (
    <React.Fragment>
        <div className='my-5 text-lg text-center '>
         <SectionHeaders
          subHeader={'Users with Online Orders'}
        />
        </div>
    <div>
      {loading? (
        <p>Loading...</p>
      ) : (
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={cartOrderData}>
            {(item) => (
              <TableRow key={uuidv4()}>
                <TableCell>
                  <Link href={`/cart/cart-display/${item.userId}`}>
                    <Image src={item.userImage} width={200} height={300} alt={item.userName} className="w-20 h-20 rounded-full" />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/cart/cart-display/${item.userId}`}>{item.userName}</Link>
                </TableCell>
                <TableCell>
                  <Link href={`/cart/cart-display/${item.userId}`}>{item.address.phone}</Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
    </React.Fragment>
  );
};

export default CartOrdered;