'use client';
import SectionHeaders from "../../components/layout/SectionHeaders";
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import { dbTimeForHuman } from "../../libs/datetime";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { data: profile } = useProfile();

  useEffect(() => {
    function fetchOrders() {
      setLoadingOrders(true);
      fetch('/api/orders').then(res => {
        res.json().then(orders => {
          setOrders(orders.reverse());
          setLoadingOrders(false);
        });
      });
    }
    fetchOrders();
  }, []);

  return (
    <section className="mt-8 px-4 max-w-2xl mx-auto">
      <div className="py-2">
        <SectionHeaders mainHeader="Orders" />
      </div>
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && (
          <div className="text-center text-gray-500">Loading orders...</div>
        )}
        {orders?.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-100 p-4 rounded-lg flex flex-col md:flex-row items-center gap-4"
              >
                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                  <div>
                    <div
                      className={
                        (order.paid ? "bg-green-500" : "bg-red-400") +
                        " p-2 rounded-md text-white w-24 text-center text-sm"
                      }
                    >
                      {order.paid ? "Paid" : "Not paid"}
                    </div>
                  </div>
                  <div className="grow">
                    <div className="flex flex-col md:flex-row gap-2 items-center mb-1">
                      <div className="grow text-sm font-medium">{order.userEmail}</div>
                      <div className="text-gray-500 text-xs">
                        {dbTimeForHuman(order.createdAt)}
                      </div>
                    </div>
                    <div className="text-gray-500 text-xs">
                      {order.cartProducts.map((p) => p.name).join(", ")}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto flex justify-end">
                  <Link
                    href={"/orders/" + order._id}
                    className="button bg-blue-500 text-white px-4 py-2 rounded text-sm"
                  >
                    Show order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No orders found.</div>
        )}
      </div>
    </section>
  );
}