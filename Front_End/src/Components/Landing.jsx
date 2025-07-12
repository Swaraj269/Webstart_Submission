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
      title: "Denim Jacket",
      image:
        "https://i.pinimg.com/736x/4b/b4/73/4bb473abb58fb4040736318e926a37a9.jpg",
      condition: "Like New",
    },
    {
      id: 2,
      title: "Red Kurta",
      image: "https://via.placeholder.com/150",
      condition: "Good",
    },
    {
      id: 3,
      title: "Winter Hoodie",
      image: "https://via.placeholder.com/150",
      condition: "Excellent",
    },
    {
      id: 4,
      title: "Formal Shirt",
      image: "https://via.placeholder.com/150",
      condition: "New",
    },
    {
      id: 5,
      title: "Hoodie",
      image: "https://via.placeholder.com/150",
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
            to="/items"
            className="border flex text-[1vw] duration-[0.2s] items-center gap-2 border-[#447D9B] text-[#447D9B] px-6 py-3 hover:bg-blue-100"
          >
            <GiLoincloth /> Browse Items
          </Link>
          <Link
            to="/dashboard"
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
