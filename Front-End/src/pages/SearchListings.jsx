import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { SidebarContext } from "../context/SidebarContex";
import Card from "../components/Card";
import { ChevronLeft, ChevronRight } from "react-feather";

// Custom hook to parse the query string
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const categories = [
  "Books", "Electronics", "Fashion", "Stationery",
  "Gadgets", "Sports Gear", "Services", "Furniture", "Other"
];

const SearchListings = () => {
  const query = useQuery();
  const search = query.get("query");
  const category = query.get("category");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQuery, setNewQuery] = useState(search || "");
  const [newCategory, setNewCategory] = useState(category || "");
  const { collapsed } = useContext(SidebarContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    API.get(`/products/search?query=${search || ""}&category=${category || ""}`)
      .then((res) => {
        setListings(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error Fetching data using Search", error);
        setLoading(false);
      });
  }, [search, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/listings/search?query=${newQuery}&category=${newCategory}`);
  };

  return (
    <div
      className={`min-h-screen mt-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white transition-all duration-300 ${
        collapsed ? "ml-[70px]" : "ml-[260px]"
      }`}
    >
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Search Bar */}
        <div className="mb-10">
          <form
            onSubmit={handleSearch}
            className="bg-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm"
          >
            <h2 className="text-xl font-bold text-white mb-4">Refine your search</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search for books, gadgets, services..."
                    value={newQuery}
                    onChange={(e) => setNewQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="md:w-64">
                <div className="relative">
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg appearance-none bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Search Results Title and Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
              Search Results
            </h1>
            <p className="text-gray-400 text-sm">
              {listings.length} items found for "{search || 'all'}" 
              {category && ` in "${category}"`}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select 
              className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
              defaultValue="newest"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="w-full h-48 bg-gray-700"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-6"></div>
                  <div className="h-5 bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-gray-800/50 rounded-xl p-10 text-center border border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-400 text-lg mb-4">No listings found</p>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              No results for "{search || 'all'}" {category && `in "${category}"`}. Try adjusting your search criteria.
            </p>
            <Link 
              to="/listings"
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition"
            >
              Back to all listings
            </Link>
          </div>
        ) : (
          /* Listings Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Pagination - Optional */}
        {!loading && listings.length > 0 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors">
                <ChevronLeft size={20} className="text-white" />
              </button>
              
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500 text-white">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors">3</button>
              
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors">
                <ChevronRight size={20} className="text-white" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchListings;
