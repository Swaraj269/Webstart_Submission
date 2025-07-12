import React, { useEffect, useRef, useState } from "react";

export default function ItemDetails() {
  const mainImg = "/images/img5.webp";

  const PAGE_SIZE = 4;
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([
    "/images/img1.webp",
    "/images/img2.webp",
    "/images/img3.webp",
    "/images/img4.webp",
  ]);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);


  const fetchMore = async (pageNum) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = pageNum * PAGE_SIZE + 1;
        const newImages = Array.from({ length: PAGE_SIZE }).map(
          (_, i) => `/images/img${(start + i) % 5 || 5}.webp`
        );
        resolve(newImages);
      }, 600);
    });
  };

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    const next = await fetchMore(page);
    setGallery((prev) => [...prev, ...next]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { threshold: 0.1 }
    );
    if (sentinelRef.current) obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [sentinelRef.current, gallery]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-md flex justify-center items-center">
          <img
            src={mainImg}
            alt="Main Item"
            className="rounded-md object-contain w-full h-96 bg-gray-700"
          />
        </div>

        <div className="bg-gray-800 p-4 rounded-md space-y-4">
          <h2 className="text-xl font-bold">Product Name</h2>
          <p className="text-gray-400">
            This is a detailed description of the product with relevant features,
            condition, and usage instructions.
          </p>

          <div className="text-sm text-gray-300">
            <strong>Uploaded By:</strong> Felix Jayaprakash
          </div>

          <div className="flex gap-4">
            <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
              Swap Request
            </button>
            <button className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700">
              Redeem via Points
            </button>
          </div>

          <div className="text-sm text-green-400 font-semibold">✅ Available</div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Product Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((img, idx) => (
            <div key={idx} className="bg-gray-800 p-2 rounded-md text-center">
              <img
                src={img}
                alt={`Product ${idx + 1}`}
                className="rounded-md object-contain w-full h-60 bg-gray-700"
              />
              <p className="mt-2 text-sm">Product {idx + 1}</p>
            </div>
          ))}
        </div>

        <div ref={sentinelRef} className="h-6" />
        {loading && (
          <p className="text-center text-gray-400 mt-2">Loading more...</p>
        )}
      </div>
    </div>
  );
}
