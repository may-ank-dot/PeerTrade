import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const Listings = () => {
  const [listing, setListing] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setListing(res.data);
      })
      .catch((error) => {
        console.error("Error fetching listings", error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/listings/search?query=${query}&category=${category}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <div className="flex-1 ml-64 p-8 overflow-auto">
        {/* Search Bar at the Top */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-1/3"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-1/3"
            >
              <option value="">All Categories</option>
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="services">Services</option>
            </select>
            <button
              type="submit"
              className="py-2 bg-cyan-500 hover:bg-cyan-600 rounded text-white font-semibold transition duration-300 w-1/3"
            >
              Search
            </button>
          </form>
        </div>

        {/* Listings */}
        <h1 className="pt-15 text-4xl font-bold text-cyan-400 mb-8">Latest Listings</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listing.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-gray-300 mb-2">{item.description}</p>
              <p className="text-green-400 font-bold mb-4">₹{item.price}</p>
              <Link
                to={`/listings/${item.id}`}
                className="text-cyan-400 hover:underline text-sm font-semibold"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;
