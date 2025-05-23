import React, { useContext, useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContex";
import Card from "../components/Card";
import { ChevronLeft, ChevronRight } from "react-feather";

const Listings = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [listingType, setListingType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const { collapsed } = useContext(SidebarContext);
  const navigate = useNavigate();

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await API.get("/products");
      setListing(res.data);
    } catch (error) {
      console.error("Error fetching listings", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (category) params.append('category', category);
    if (listingType) params.append('listing_type', listingType);
    if (priceRange) params.append('price_range', priceRange);
    
    navigate(`/listings/search?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setQuery("");
    setCategory("");
    setListingType("");
    setPriceRange("");
    fetchListings();
  };

  const categories = [
    "Books", "Electronics", "Fashion", "Stationery",
    "Gadgets", "Sports Gear", "Services", "Furniture", "Other"
  ];

  const listingTypes = [
    { value: "sell", label: "For Sale" },
    { value: "rent", label: "For Rent" },
    { value: "both", label: "Sale & Rent" }
  ];

  const priceRanges = [
    { value: "0-500", label: "Under ₹500" },
    { value: "500-1000", label: "₹500 - ₹1,000" },
    { value: "1000-5000", label: "₹1,000 - ₹5,000" },
    { value: "5000-10000", label: "₹5,000 - ₹10,000" },
    { value: "10000+", label: "Above ₹10,000" }
  ];

  return (
    <div className={`min-h-screen mt-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white transition-all duration-300 ${collapsed ? "ml-[70px]" : "ml-[260px]"}`}>
      <div className="max-w-7xl mx-auto p-6 md:p-8">

        <div className="mb-10">
          <form
            onSubmit={handleSearch}
            className="bg-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm"
          >
            <h2 className="text-xl font-bold text-white mb-4">Find what you need</h2>
            
            {/* Main Search Row */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <svg className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for books, gadgets, services..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500 transition-all duration-200"
                />
              </div>

              <div className="md:w-48 relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg appearance-none bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293L10 12l4.707-4.707-1.414-1.414L10 9.172 6.707 5.879 5.293 7.293z" />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold text-white flex items-center transition-all duration-200"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                Search
              </button>
            </div>

            {/* Advanced Filters Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <select
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg appearance-none bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
                >
                  <option value="">All Types</option>
                  {listingTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293L10 12l4.707-4.707-1.414-1.414L10 9.172 6.707 5.879 5.293 7.293z" />
                  </svg>
                </div>
              </div>

              <div className="flex-1 relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg appearance-none bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
                >
                  <option value="">All Prices</option>
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293L10 12l4.707-4.707-1.414-1.414L10 9.172 6.707 5.879 5.293 7.293z" />
                  </svg>
                </div>
              </div>

              {(query || category || listingType || priceRange) && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-all duration-200 flex items-center"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>

        {(query || category || listingType || priceRange) && (
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="text-gray-400 text-sm">Active filters:</span>
            {query && (
              <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm border border-cyan-500/30">
                Search: "{query}"
              </span>
            )}
            {category && (
              <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                Category: {categories.find(cat => cat.toLowerCase() === category) || category}
              </span>
            )}
            {listingType && (
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30">
                Type: {listingTypes.find(type => type.value === listingType)?.label}
              </span>
            )}
            {priceRange && (
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                Price: {priceRanges.find(range => range.value === priceRange)?.label}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">Latest Listings</h1>
            <p className="text-gray-400 text-sm">{listing.length} items available</p>
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
              <option value="sell-only">For Sale Only</option>
              <option value="rent-only">For Rent Only</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-xl shadow-md animate-pulse">
                <div className="h-48 bg-gray-700 rounded-t-xl"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-5 bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : listing.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <div className="bg-gray-800/50 rounded-xl p-10 max-w-md mx-auto border border-gray-700">
              <svg className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.002-5.824-2.651m6.668-1.395L16 9h5l-4 7h-4.668-1.395z" />
              </svg>
              <h2 className="text-xl mb-4 text-white">No listings found</h2>
              <p className="mb-6 text-gray-400">Try adjusting your search or filter criteria.</p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listing.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        )}

        {!loading && listing.length > 0 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors">
                <ChevronLeft size={20} className="text-white" />
              </button>
              <button className="w-10 h-10 bg-cyan-500 text-white rounded-lg">1</button>
              <button className="w-10 h-10 bg-gray-800 text-white rounded-lg hover:bg-gray-700">2</button>
              <button className="w-10 h-10 bg-gray-800 text-white rounded-lg hover:bg-gray-700">3</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700">
                <ChevronRight size={20} className="text-white" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;