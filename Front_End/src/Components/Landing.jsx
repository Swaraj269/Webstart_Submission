import React from "react";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { GiLoincloth } from "react-icons/gi";
import { RiSwap2Fill } from "react-icons/ri";
import { FaHandHoldingHeart } from "react-icons/fa";
import ProductCard from "./ProductCard";
function Landing() {
  const dummyItems = [
    {
      id: 1,
      title: "Women Kurti",
      image: "http://localhost:5173/images/img5.webp",
      condition: "Like New",
    },
    {
      id: 2,
      title: "Red Kurti",
      image: "http://localhost:5173/images/img4.webp",
      condition: "Good",
    },
    {
      id: 3,
      title: "Winter Hoodie",
      image:
        "data:image/webp;base64,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",
      condition: "Excellent",
    },
    {
      id: 4,
      title: "Formal Shirt",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTKUoUzDf1srIoAEh9Uja4vj4onDW1PPVF3Kr5jtMEvAOXGqQconod4KUhHyO5eGCFGAJDwXmi3d81iyztl8XwNUuz1duddP_QWOyPZjpSB",
      condition: "New",
    },
    {
      id: 5,
      title: "T-Shirt",
      image:
        "data:image/webp;base64,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",
      condition: "Excellent",
    },
  ];
  return (
    <div className=" w-full">
      {/* Hero Section */}
      <section className="h-[55vh]  pb-[1vw] text-center flex flex-col justify-end items-center">
        <h1 className="text-[3vw] md:text-[3.1vw] font-[500] leading-[1.1] w-[50%]  mb-[1vw]">
          Give Clothes a Second <span className="text-[#FE7743]">Life</span>,
          and the Planet a Second <span className="text-[#FE7743]">Chance</span>
        </h1>
        <p className=" text-[1.2vw] w-[30%] mb-[2vw]">
          Exchange unused clothes through swapping or points. Reduce textile
          waste, one item at a time.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-[1vw]">
          <Link
            to="/add-item"
            className="bg-[#447D9B] text-[1vw] duration-[0.2s] flex items-center gap-2 text-white px-6 py-3 hover:bg-transparent hover:text-[#447D9B] border-2 border-[#447D9B]"
          >
            <IoAdd />
            List an Item
          </Link>
          <Link
            to="/item/1"
            className="border flex text-[1vw] duration-[0.2s] items-center gap-2 border-[#447D9B] text-[#447D9B] px-6 py-3 hover:bg-blue-100"
          >
            <GiLoincloth /> Browse Items
          </Link>
          <Link
            to="/items"
            className="bg-[#FE7743] text-[1vw] flex items-center gap-2 duration-[0.2s] text-white px-6 py-3 hover:bg-transparent hover:text-[#FE7743] border-2 border-[#FE7743]"
          >
            <RiSwap2Fill /> Start Swapping
          </Link>
        </div>
      </section>

      {/* Featured Items */}
      <section className=" h-[62vh] px-[2.2vw] flex flex-col items-center pt-[3.5vw]">
        <h2 className="text-[2vw] mb-[3vw] font-[500] flex items-center gap-4 font-semibold text-center mb-6">
          <FaHandHoldingHeart /> Featured Items
        </h2>
        <div className="grid h-[90%] grid-cols-1 sm:grid-cols-2 overflow-hidden md:grid-cols-5 gap-[2vw] px-4 w-full">
          {dummyItems.map((item) => (
            <ProductCard
              name={item.title}
              condition={item.condition}
              imgsrc={item.image}
              id={item.id}
              key={item.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Landing;
