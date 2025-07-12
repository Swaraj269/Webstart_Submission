// import React from 'react'

// function Admin() {
//   return (
//     <div>Admin</div>
//   )
// }

// export default Admin

import React, { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 5;

const Admin = () => {
  const [tab, setTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [listings, setListings] = useState([]);

  const [userPage, setUserPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [listingPage, setListingPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  // Dummy fetch function for all tabs
  const fetchData = (type, pageNum) => {
    return new Promise((res) => {
      setTimeout(() => {
        const data = Array.from({ length: PAGE_SIZE }, (_, i) => {
          const id = (pageNum - 1) * PAGE_SIZE + i + 1;
          return {
            id,
            title: `${type[0].toUpperCase() + type.slice(1)} ${id}`,
            detail: `${
              type === "users" ? "Moderation" : "Tracking"
            } info for ${type} #${id}`,
            color: `hsl(${Math.random() * 360}, 60%, 50%)`,
          };
        });
        res(data);
      }, 600);
    });
  };

  // Load more depending on tab
  const loadMore = async () => {
    if (loading) return;
    setLoading(true);

    if (tab === "users") {
      const newUsers = await fetchData("users", userPage);
      setUsers((prev) => [...prev, ...newUsers]);
      setUserPage((prev) => prev + 1);
    } else if (tab === "orders") {
      const newOrders = await fetchData("orders", orderPage);
      setOrders((prev) => [...prev, ...newOrders]);
      setOrderPage((prev) => prev + 1);
    } else if (tab === "listings") {
      const newListings = await fetchData("listings", listingPage);
      setListings((prev) => [...prev, ...newListings]);
      setListingPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  // Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
      }
    );

    const current = sentinelRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [tab, sentinelRef.current]);

  // Initial load when tab changes
  useEffect(() => {
    const fillScreen = async () => {
      if (tab === "users" && users.length === 0) {
        while (document.documentElement.scrollHeight <= window.innerHeight) {
          await loadMore();
        }
      }
      if (tab === "orders" && orders.length === 0) {
        while (document.documentElement.scrollHeight <= window.innerHeight) {
          await loadMore();
        }
      }
      if (tab === "listings" && listings.length === 0) {
        while (document.documentElement.scrollHeight <= window.innerHeight) {
          await loadMore();
        }
      }
    };

    fillScreen();
  }, [tab]);

  // Common row render
  const renderItem = (item, actionButtons = true) => (
    <li key={item.id} className="flex items-center bg-[#FE7743]  p-4 gap-4">
      <div
        className="w-16 h-16 rounded-full"
        style={{ backgroundColor: "#ffffff" }}
      ></div>
      <div className="flex-1 bg-white p-3 ">
        <p className="font-semibold">{item.title}</p>
        <p className="text-sm">{item.detail}</p>
      </div>
      {actionButtons && (
        <div className="flex flex-col text-white gap-2">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-1  text-sm">
            Approve
          </button>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-1 text-sm">
            Reject
          </button>
        </div>
      )}
    </li>
  );

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["users", "orders", "listings"].map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded border ${
              tab === key ? "bg-white text-black font-semibold" : "border-white"
            }`}
          >
            Manage {key[0].toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Section Content */}
      {tab === "users" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
          <ul className="space-y-4">{users.map((u) => renderItem(u, true))}</ul>
        </div>
      )}

      {tab === "orders" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
          <ul className="space-y-4">
            {orders.map((o) => renderItem(o, false))}
          </ul>
        </div>
      )}

      {tab === "listings" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Manage Listings</h2>
          <ul className="space-y-4">
            {listings.map((l) => renderItem(l, true))}
          </ul>
        </div>
      )}

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-6" />
      {loading && (
        <p className="text-center text-gray-400 mt-4">Loading more...</p>
      )}
    </div>
  );
};

export default Admin;
