import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ItemDetails() {
  const PAGE_SIZE = 4;
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: null });

  const mainImg = gallery[0]?.image_url;

  // Fetch product listings from backend
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:4000/items");
        const data = await res.json();
        setGallery(data.listings);
      } catch (err) {
        console.error("Failed to load listings", err);
      }
    };

    fetchListings();
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { threshold: 0.1 }
    );
    if (sentinelRef.current) obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [sentinelRef.current, gallery]);

  // Dummy pagination (optional logic retained)
  const fetchMore = async (pageNum) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]); // Placeholder – real data is already loaded above
      }, 600);
    });
  };

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    await fetchMore(page); // No-op for now
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  const handleSendRequest = () => {
    console.log("Swap Request Submitted:", form);
    toast.success("Swap request sent successfully!");
    setShowModal(false);
    setForm({ title: "", description: "", image: null });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Item Listing</h1>

      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-md mb-6">
        <input
          type="text"
          placeholder="Search item..."
          className="bg-gray-700 px-4 py-2 rounded-md w-2/3 outline-none"
        />
        <button className="bg-gray-600 px-4 py-2 rounded-md">🔍</button>
      </div>

      {/* Main section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-md flex justify-center items-center">
          {mainImg ? (
            <img
              src={mainImg}
              alt="Main Item"
              className="rounded-md object-contain w-full h-96 bg-gray-700"
            />
          ) : (
            <div className="text-gray-500">No main image</div>
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded-md space-y-4">
          <h2 className="text-xl font-bold">{gallery[0]?.title || "No title"}</h2>
          <p className="text-gray-400">{gallery[0]?.description || "No description available."}</p>

          <div className="text-sm text-gray-300">
            <strong>Uploaded By:</strong> User #{gallery[0]?.seller_id || "N/A"}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Swap Request
            </button>
            <button className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700">
              Redeem via Points
            </button>
          </div>

          <div className="text-sm text-green-400 font-semibold">✅ Available</div>
        </div>
      </div>

      {/* Product Gallery */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Product Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.slice(1).map((item, idx) => (
            <div key={item.id} className="bg-gray-800 p-2 rounded-md text-center">
              <img
                src={item.image_url}
                alt={`Product ${idx + 2}`}
                className="rounded-md object-contain w-full h-60 bg-gray-700"
              />
              <p className="mt-2 text-sm">{item.title}</p>
            </div>
          ))}
        </div>
        <div ref={sentinelRef} className="h-6" />
        {loading && <p className="text-center text-gray-400 mt-2">Loading more...</p>}
      </div>

      {/* Swap Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-white mb-2">Swap Request</h2>

            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 rounded-md bg-gray-700 text-white outline-none"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2 rounded-md bg-gray-700 text-white outline-none"
              rows="3"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              className="text-gray-300"
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={handleSendRequest}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
