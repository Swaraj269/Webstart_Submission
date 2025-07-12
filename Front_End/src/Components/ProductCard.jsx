import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ name, description, imgsrc, condition, id }) {
  return (
    <div className="overflow-hidden shrink-0 ">
      <Link to={`/item/${id}`} key={id} className="bg-white overflow-hidden">
        <img
          src={imgsrc}
          alt={name}
          className="w-full duration-[1s] hover:scale-[1.1]  h-48 object-contain"
        />
        <div className="p-2 mt-2 border">
          <h3 className="text-[1.2vw] font-[500] ">{name}</h3>
          <p className="text-gray-600  text-sm">{condition}</p>
          {description && <p className="w-[20vw]" >{description}</p>}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
