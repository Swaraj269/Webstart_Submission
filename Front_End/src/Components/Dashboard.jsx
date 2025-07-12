import React, { useRef, useState } from "react";
import ProductCard from "./ProductCard";

function Dashboard() {
  const scrollRef = useRef(null);
  const purchaseScrollRef = useRef(null);

  // User details state
  const [user, setUser] = useState({
    name: "Alex Jacob",
    email: "abc@gmail.com",
    phone: "9191919191",
  });
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState(user);
  const [sale, setsale] = useState(20);
  const [Purchase, setPurchase] = useState(200);
  const [cart, setcart] = useState(50);

  // Dummy Listings (user's uploaded items)
  const listingCards = [
    {
      id: 1,
      title: "Blue Denim Jacket",
      desc: "A stylish blue denim jacket in excellent condition. Worn only once.",
      image:
        "https://images.unsplash.com/photo-1631737725437-708860bad99c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Red Cotton Kurta",
      desc: "Traditional red kurta, perfect for festivals or casual wear.",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: 3,
      title: "Formal White Shirt",
      desc: "White shirt suitable for office and formal events. Like new.",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: 4,
      title: "Black Hoodie",
      desc: "Comfy black hoodie, ideal for winters. Good condition.",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: 5,
      title: "Grey Sweatpants",
      desc: "Lightweight and comfortable grey sweatpants. Fair condition.",
      image: "https://source.unsplash.com/featured/?pants",
    },
    {
      id: 6,
      title: "Summer T-Shirt",
      desc: "Cool summer tee with graphic print. Gently used.",
      image: "https://source.unsplash.com/featured/?tshirt",
    },
  ];

  // Dummy Purchases (user's redeemed items)
  const purchaseCards = [
    {
      id: 1,
      title: "Brown Leather Jacket",
      desc: "Purchased from Aryan — looks rugged and stylish for winters.",
      image: "https://source.unsplash.com/featured/?leatherjacket",
    },
    {
      id: 2,
      title: "Blue Party Dress",
      desc: "Redeemed from Riya — elegant evening wear, lightly used.",
      image: "https://source.unsplash.com/featured/?dress",
    },
    {
      id: 3,
      title: "Ethnic Green Kurta",
      desc: "Swapped with Rahul — vibrant and festive.",
      image: "https://source.unsplash.com/featured/?ethnicwear",
    },
    {
      id: 4,
      title: "Woolen Scarf",
      desc: "Received from Swapna — warm and stylish scarf for cold days.",
      image: "https://source.unsplash.com/featured/?scarf",
    },
    {
      id: 5,
      title: "Casual Cap",
      desc: "Redeemed from Zara — trendy cap for sunny days.",
      image: "https://source.unsplash.com/featured/?cap",
    },
  ];

  const scrollByCard = (direction, ref = scrollRef) => {
    const container = ref.current;
    if (!container) return;
    const card = container.querySelector("div > div");
    if (!card) return;
    const cardWidth = card.offsetWidth + 4; // 4px for gap-1
    container.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  //clicking functionality
  const editDetails = () => {
    setForm(user); // Load current details into form
    setEditOpen(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    setEditOpen(false);
  };

  const listItemClicked = (id, desc) => {
    console.log("List Item clicked: Id " + id + " Desc: " + desc);
  };

  const purchaseItemClicked = (id, desc) => {
    console.log("Purchase  Item clicked: Id " + id + " Desc: " + desc);
  };

  return (
    <>
      <div className="w-full h-screen pt-[6vw] px-[2.2vw]">
        <div className="w-full h-full overflow-hidden">
          {/* profile section */}
          <div className="w-full h-[43%] flex">
            <div className="h-full w-[50%] sm:w-[40%] flex p-3 ">
              {/* User photo */}
              <div className="profilephoto h-[13vw] w-[13vw] overflow-hidden rounded-full">
                <img
                  src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="sm:w-[60%] w-[50%] h-full p-2 flex flex-col ">
              {/* user detail */}
              <div className="w-full h-[80%] sm:flex sm:gap-[5px]">
                <div className="w-full sm:w-[50%] h-[50%] sm:h-full  flex flex-col gap-[10px]">
                  <div className="w-full sm:w-full h-[30px] sm:h-[45px]  rounded-[10px] flex items-center pl-3">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                  </div>
                  <div className="w-full sm:w-full h-[30px] sm:h-[45px]   rounded-[10px] flex items-center pl-3">
                    <h1 className="text-lg ">{user.email}</h1>
                  </div>
                  <div className="w-full sm:w-full h-[30px] sm:h-[45px]   rounded-[10px] flex items-center pl-3">
                    <h1 className="text-lg ">{user.phone}</h1>
                  </div>
                </div>

                <div className="w-full sm:w-[50%] h-[50%] sm:h-full  flex flex-col gap-[10px] pt-0">
                  <div className="w-full sm:w-full h-[30px] sm:h-[45px]   rounded-[10px] flex items-center pl-3">
                    <h1 className="text-lg ">
                      <span className="font-bold">Sale:</span>
                      {sale}
                    </h1>
                  </div>
                  <div className="w-full sm:w-full h-[30px] sm:h-[45px]   rounded-[10px] flex items-center pl-3">
                    <h1 className="text-lg ">
                      <span className="font-bold">Purchase:</span> {Purchase}
                    </h1>
                  </div>
                  <div className="w-full sm:w-full h-[30px] sm:h-[45px]   rounded-[10px] flex items-center pl-3">
                    <h1 className="text-lg ">
                      <span className="font-bold">Cart:</span> {cart}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-[40%] h-[15%] sm:h-[20%] bg-gray-300  ">
                <button
                  className="h-full w-full cursor-pointer hover:bg-[#1447E6] hover:text-white  transition-all duration-300"
                  onClick={editDetails}
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>

          {/* Listing Section */}
          <div className="w-full h-[50%] my-[2vw] px-2">
            <div className="h-[10%] w-full">
              <h1 className="text-[1vw]">My Listing</h1>
            </div>

            <div className="relative flex gap-[4vw]  h-[90%] w-full mt-2">
              {/* Left Arrow */}
              {listingCards.length > 4 && (
                <button
                  className="hidden sm:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-white/80 hover:bg-green-600 text-green-800 rounded-full shadow-lg transition-all cursor-pointer"
                  onClick={() => scrollByCard("left")}
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              )}
              {listingCards.map((item) => (
                <ProductCard
                  key={item.id}
                  description={item.desc}
                  imgsrc={item.image}
                  id={item.id}
                  name={item.title}
                />
              ))}
              {/* Scrollable Cards */}

              {/* Right Arrow */}
              {listingCards.length > 4 && (
                <button
                  className="hidden sm:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-white/80 hover:bg-green-400 text-green-800 rounded-full shadow-lg transition-all cursor-pointer"
                  onClick={() => scrollByCard("right")}
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* My purchase */}
          <div className="w-full h-[30%] px-2">
            <div className="h-[10%] w-full">
              <h1 className="font-bold">My Purchase</h1>
            </div>
            <div className="relative h-[90%] w-full mt-2">
              {/* Left Arrow */}
              {purchaseCards.length > 4 && (
                <button
                  className="hidden sm:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-white/80 hover:bg-green-600 text-green-800 rounded-full shadow-lg transition-all cursor-pointer"
                  onClick={() => scrollByCard("left", purchaseScrollRef)}
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              )}

              {/* Scrollable Cards */}
              <div
                ref={purchaseScrollRef}
                className="h-full w-full overflow-x-auto scrollbar-hide"
              >
                <div className="flex h-full gap-1">
                  {purchaseCards.map((item) => (
                    <div
                      key={item.id}
                      className="h-[90%] w-1/3 sm:w-1/4 flex-shrink-0 bg-yellow-200 rounded-[20px] flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-yellow-500 transition-all duration-300"
                      title="Click to see details"
                      onClick={() => purchaseItemClicked(item.id, item.desc)}
                    >
                      <div className="text-lg font-bold">{item.title}</div>
                      <div className="text-sm text-gray-700">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              {purchaseCards.length > 4 && (
                <button
                  className="hidden sm:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-white/80 hover:bg-green-400 text-green-800 rounded-full shadow-lg transition-all cursor-pointer"
                  onClick={() => scrollByCard("right", purchaseScrollRef)}
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md flex flex-col gap-4"
            onSubmit={handleFormSubmit}
          >
            <h2 className="text-xl font-bold mb-2">Edit Details</h2>
            <label className="flex flex-col">
              Name:
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="border rounded px-2 py-1 mt-1"
                required
              />
            </label>
            <label className="flex flex-col">
              Email:
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleFormChange}
                className="border rounded px-2 py-1 mt-1"
                required
              />
            </label>
            <label className="flex flex-col">
              Phone:
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                className="border rounded px-2 py-1 mt-1"
                required
              />
            </label>
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Dashboard;
