"use client";
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuidv4 } from "uuid";
import SectionHeaders from '../../../components/layout/SectionHeaders';
import UserTabs from '../../../components/layout/UserTabs';

const CartOrdered = () => {
  const [cartOrderData, setCartOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartOrdered = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/cart-no-mobilePay/cart-order-users');
        const data = await response.json();
        setCartOrderData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCartOrdered();
  }, []);

  const columns = [
    { key: 'image', label: 'IMAGE' },
    { key: 'name', label: 'NAME' },
    { key: 'phone', label: 'PHONE' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  return (
    <React.Fragment>
      <UserTabs isAdmin={true} />
      <div className="my-8 text-center px-4">
        <SectionHeaders minorHeader={"Users' Orders with Outside Payment"} />
      </div>
      <div className="px-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <Table aria-label="Users' Orders Table" className="w-full">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key} className="text-sm sm:text-base">
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={cartOrderData}>
              {(item) => (
                <TableRow key={uuidv4()}>
                  <TableCell>
                    <Link href={`/cart/cart-display/${item.userId}`}>
                      <Image
                        src={item.userImage}
                        width={200}
                        height={300}
                        alt={item.userName}
                        className="w-12 h-12 sm:w-20 sm:h-20 rounded-full object-cover"
                      />
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm sm:text-base">
                    <Link href={`/cart/cart-display/${item.userId}`} className="hover:underline">
                      {item.userName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm sm:text-base">
                    <Link href={`/cart/cart-display/${item.userId}`} className="hover:underline">
                      {item.address.phone}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/cart/cart-display/${item.userId}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-blue-600 transition-colors">
                        Display
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>
    </React.Fragment>
  );
};

export default CartOrdered;