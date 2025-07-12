import React, { useState } from "react";

export default function ProductDetailPage() {
  const [imageTitle, setImageTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [listings, setListings] = useState([]);

  const handleAddListing = () => {
    if (!imageTitle || !description || !imageFile) return;
    const imageUrl = URL.createObjectURL(imageFile);
    const newListing = {
      title: imageTitle,
      description,
      image: imageUrl
    };
    setListings([...listings, newListing]);
    setImageTitle("");
    setDescription("");
    setImageFile(null);
  };

  return (
    <div className="min-h-screen bg-white text-black p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-sm border border-white px-2 py-1 rounded">Logo</div>
        <div className="text-2xl font-semibold">Product Detail Page</div>
        <div className="w-6 h-6 border border-white rounded-full"></div>
      </div>

      {/* Navigation and Search */}
      <div className="flex items-center  ">
        <input
          type="text"
          placeholder="Search"
          className="border border-black text-black p-3 flex-grow outline-none"
        />
        <button className="p-3 border cursor-pointer border-black">
          <span className="material-icons">search</span>
        </button>
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Form Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-lg">Add Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-black"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg">Add Image Title</label>
            <input
              type="text"
              value={imageTitle}
              onChange={(e) => setImageTitle(e.target.value)}
              className="w-full p-3 bg-white  text-black border border-black "
              placeholder="Image Title"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg">Add Product Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-40 p-3 bg-white  text-black border border-black "
              placeholder="Description"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-start justify-end">
          <button
            onClick={handleAddListing}
            className="border border-black cursor-pointer px-6 py-3  text-lg"
          >
            Available/Swap
          </button>
        </div>
      </div>

      {/* Previous Listings */}
      <div>
        <div className="text-xl mb-4">Previous Listings:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((item, index) => (
            <div
              key={index}
              className="border border-white p-4 rounded flex flex-col items-center space-y-2"
            >
              <img
                src={item.image}
                alt={item.title}
                 className="rounded-md object-contain w-full h-96 hover:bg-gray-300 "
              />
              <div className="text-center text-base font-medium">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
