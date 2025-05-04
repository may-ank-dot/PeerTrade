import React from "react";
import { useNavigate } from "react-router-dom";

const ListingModal = ({ listing, onClose, onDelete }) => {
  const navigate = useNavigate();

  if (!listing) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-md relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-2xl"
        >
          &times;
        </button>
        <img
          src={listing.image_url}
          alt={listing.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{listing.title}</h2>
        <p className="text-sm text-gray-400 mb-2">{listing.description}</p>
        <p className="text-cyan-400 font-semibold">₹{listing.price}</p>
        <p className="text-gray-400 text-sm mb-4">Category: {listing.category}</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => navigate(`/edit/${listing.id}`)}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(listing.id)}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingModal;
