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

  
const fetchData = async (type, pageNum) => {
  const adminId = 1; 
  const url = `/admin/${type}?page=${pageNum}&adminId=${adminId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${type}`);
  const data = await res.json();
  return data;
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
const renderItem = (item, actionButtons = true, type = "") => (
  <li key={item.id} className="flex items-center bg-[#FE7743] p-4 gap-4">
    <div className="w-16 h-16 rounded-full" style={{ backgroundColor: "#ffffff" }} />
    <div className="flex-1 bg-white p-3">
      <p className="font-semibold">{item.title}</p>
      <p className="text-sm">{item.detail}</p>
    </div>
    {actionButtons && (
      <div className="flex flex-col text-white gap-2">
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-1 text-sm"
          onClick={() => handleApprove(item.id, type)}
        >
          Approve
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-1 text-sm"
          onClick={() => handleDelete(item.id, type)}
        >
          Reject
        </button>
      </div>
    )}
  </li>
);

const adminId = 1; // get from context or auth

const handleDelete = async (id, type) => {
  const confirmed = window.confirm(`Are you sure you want to delete this ${type}?`);
  if (!confirmed) return;

  const endpoint = type === "users" ? "user" : "listing";

  try {
    const res = await fetch(`/admin/${endpoint}/${id}?adminId=${adminId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Delete failed");

    // Remove from local state
    if (type === "users") setUsers((prev) => prev.filter((u) => u.id !== id));
    else if (type === "listings") setListings((prev) => prev.filter((l) => l.id !== id));
  } catch (err) {
    console.error(err);
    alert("Error deleting item.");
  }
};


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
            {users.map((u) => renderItem(u, true, "users"))}
            {orders.map((o) => renderItem(o, false, "orders"))}
            {listings.map((l) => renderItem(l, true, "listings"))}
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
