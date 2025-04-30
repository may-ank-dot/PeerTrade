import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/products/${id}`)   
      .then((res) => {
        setListing(res.data.listing);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching listing details", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-cyan-400 text-xl font-semibold animate-pulse">
          Loading Listing Details...
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl font-semibold">
          Listing not found!
        </div>
      </div>
    );
  }

  return (
    <div className="flex mt-12 justify-center items-start min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 p-6">
      <div className="w-full max-w-4xl bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex justify-center mt-4">
            {/* Image */}
            {listing.image_url && (
              <img
                src={listing.image_url}
                alt={listing.title}
                className="w-1/2 rounded-2xl flex justify-center items-center h-76 object-cover"
              />
            )}
        </div>

        {/* Details */}
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">{listing.title}</h1>
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">{listing.description}</p>

          {/* Category and Price */}
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-gray-800 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold">
              Category: {listing.category}
            </span>
            <span className="bg-gray-800 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
              ₹{listing.price}
            </span>
          </div>

          {/* Seller Info (Dummy for now, you can fetch later) */}
          <div className="border-t border-gray-700 pt-6 mt-6">
            <h3 className="text-xl font-semibold text-white mb-2">Seller Information</h3>
            <p className="text-gray-400">Name: <span className="text-gray-200 font-medium">John Doe</span></p>
            <p className="text-gray-400">Email: <span className="text-gray-200 font-medium">johndoe@example.com</span></p>
            <p className="text-gray-400">Location: <span className="text-gray-200 font-medium">Noida, India</span></p>
          </div>

          {/* Posted Date */}
          <div className="mt-6 text-gray-500 text-sm">
            Posted on: {new Date(listing.created_at || Date.now()).toLocaleDateString()}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
              Contact Seller
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
              Report Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
