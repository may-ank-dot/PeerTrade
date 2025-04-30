import React, { useContext, useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContex";
import Card from "../components/Card"; // <-- Import Card Component

const Listings = () => {
  const [listing, setListing] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const { collapsed } = useContext(SidebarContext);
  const navigate = useNavigate();

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
    <div
      className={`flex min-h-screen mt-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white ${
        collapsed ? "ml-[70px]" : "ml-[260px]"
      }`}
    >
      <div className="flex-1 p-8 overflow-auto">
        {/* Search Bar */}
        <div className="mb-10">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4 bg-gray-900 p-6 rounded-lg shadow-md"
          >
            <input
              type="text"
              placeholder="Search for books, gadgets, services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 px-2 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">All Categories</option>
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="services">Services</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold text-white transition duration-300"
            >
              Search
            </button>
          </form>
        </div>

        {/* Listings Title */}
        <h1 className="lex text-2xl md:text-4xl font-bold text-cyan-400 mb-8 tracking-normal">
          Latest Listings
        </h1>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {listing.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;
