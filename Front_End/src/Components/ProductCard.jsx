import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ name, description, imgsrc, condition, id }) {
  return (
    <div className="overflow-hidden">
      <Link to={`/item/${id}`} key={id} className="bg-white overflow-hidden">
        <img
          src={imgsrc}
          alt={name}
          className="w-full duration-[1s] hover:scale-[1.1]  h-48 object-cover"
        />
        <div className="p-2 mt-2 border">
          <h3 className="text-[1.2vw] font-[500] ">{name}</h3>
          <p className="text-gray-600 text-sm">{condition}</p>
          {description && <p>{description}</p>}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
