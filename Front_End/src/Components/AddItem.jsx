import React, { useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
const initialForm = {
  title: "",
  description: "",
  category: "",
  type: "",
  size: "",
  condition: "",
  tags: "",
  images: [],
};

const categories = ["Men", "Women", "Kids"];
const types = ["Shirt", "Pants", "Jacket", "Kurta", "Hoodie"];
const sizes = ["XS", "S", "M", "L", "XL"];
const conditions = ["New", "Like New", "Good", "Fair"];
function AddItem() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setForm({ ...form, images: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just log it
    console.log("Form Submitted:", form);

    // Simulate API call
    setTimeout(() => {
      setMessage("Item uploaded successfully!");
      setForm(initialForm);
    }, 1000);
  };
  return (
    <div className=" w-full flex flex-col items-center pt-[8vw] justify-center ">
      <div className="headingdiv w-[36%]">
        <h1 className="w-full text-[2vw] leading-[1.1]">
          Got Clothes You Don't Wear{" "}
          <span className="text-[#FE7743]">Anymore?</span> Let Someone Else{" "}
          <span className="text-[#FE7743]">Love</span> Them.
        </h1>
      </div>
      <div className="w-[36%] pb-[1vw] mt-[1vw]">
        <h1 className="text-[2vw] flex gap-2 items-center font-[600] mb-4">
          <MdCreateNewFolder className="text-[#FE7743]" /> List a New Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 "
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 "
              rows={3}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 "
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border p-2 "
              required
            >
              <option value="">Select Type</option>
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="block mb-1 font-medium">Size</label>
            <select
              name="size"
              value={form.size}
              onChange={handleChange}
              className="w-full border p-2 "
              required
            >
              <option value="">Select Size</option>
              {sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block mb-1 font-medium">Condition</label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="w-full border p-2 "
              required
            >
              <option value="">Select Condition</option>
              {conditions.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-1 font-medium">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full border p-2 "
              placeholder="e.g. winter, blue, formal"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block mb-1 font-medium">Upload Images</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-full border p-2 "
            />
          </div>

          <button
            type="submit"
            className="bg-[#FE7743] w-full cursor-pointer text-white px-6 py-3 duration-[0.3s]  hover:bg-transparent hover:text-[#FE7743] border-2 border-[#FE7743]"
          >
            Submit
          </button>
        </form>

        {message && (
          <div className="mt-4 text-green-600 text-[2vw] font-medium">{message}</div>
        )}
      </div>
    </div>
  );
}

export default AddItem;
