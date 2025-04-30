import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-md overflow-hidden hover:scale-105 transform transition duration-300 flex flex-col h-full">
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg font-bold mb-1 truncate">{item.title}</h2>
        <p className="text-gray-400 text-sm mb-4 overflow-hidden truncate line-clamp-3">
          {item.description}
        </p>
        <div className="mt-auto">
          <p className="text-green-400 font-bold text-lg mb-1">₹{item.price}</p>
          <Link
            to={`/listings/${item.id}`}
            className="text-cyan-400 hover:underline text-sm font-semibold"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
