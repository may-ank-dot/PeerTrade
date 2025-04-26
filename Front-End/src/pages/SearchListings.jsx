import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import API from "../services/api";

// Custom hook to parse the query string
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const SearchListings = () => {
  const query = useQuery();
  const search = query.get("query");
  const category = query.get("category");
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch data based on search query and category
    API.get(`/products/search?query=${search || ""}&category=${category || ""}`)
      .then((res) => setListings(res.data))
      .catch((error) => console.error("Error Fetching data using Search", error));
  }, [search, category]);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-3xl font-semibold mb-4">Search Results</h2>
      {listings.length === 0 ? (
        <p>No listings found for "{search}" in "{category || "All Categories"}".</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-gray-700 p-4 rounded shadow-md hover:shadow-lg transition duration-300">
              {listing.image_url && (
                <img
                  src={listing.image_url}
                  alt={listing.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
              <p className="text-sm mb-1 text-gray-300">{listing.description}</p>
              <p className="text-green-600 font-bold mt-2">₹{listing.price}</p>
              <Link to={`/listings/${listing.id}`} className="text-sm text-blue-500 hover:underline mt-2 inline-block">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchListings;
