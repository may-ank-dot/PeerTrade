import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { SidebarContext } from "../context/SidebarContex";
import ListingModal from "../components/inComp/ListingModal";
import { useNavigate } from "react-router-dom";
import { Plus , MoreHorizontal } from "react-feather";


const Dashboard = () => {
  const [myListings, setMyListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const { collapsed } = useContext(SidebarContext);
  const navigate = useNavigate();

  // Fetch the user's listings on mount
  useEffect(() => {
    API.get("/products/my/:id")
      .then((res) => setMyListings(res.data))
      .catch((err) => console.error("Failed to fetch your listings", err));
  }, []);

  // Close modal
  const handleClose = () => setSelectedListing(null);

  return (
    <div
      className={`min-h-screen mt-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white transition-all duration-300 ${
        collapsed ? "ml-[70px]" : "ml-[260px]"
      }`}
    >
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Header with count & add button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
              My Listings 
            </h1>
            <p className="text-gray-400 text-sm">
              You have {myListings.length} active listings
            </p>
          </div>
          <button
            onClick={() => navigate("/addlistings")}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center"
          >
            <span className="mr-2 ">Add Listing <Plus size={20} className="inline mb-0.5"></Plus></span>
            
          </button>
        </div>

        {/* Grid of user's listings */}
        {myListings.length === 0 ? (
          <div className="bg-gray-800/50 rounded-xl p-10 text-center border border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-400 text-lg mb-4">You haven't created any listings yet.</p>
            <button 
              onClick={() => navigate("/addlistings")}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition"
            >
              Create your first listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myListings.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedListing(item)}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-cyan-900/20 transition-all duration-300 cursor-pointer border border-gray-700/50 group"
              >
                <div className="relative">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-bold truncate flex-1">{item.title}</h2>
                    <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-cyan-400 font-bold text-lg">₹{item.price}</p>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200">
                     <MoreHorizontal size={20}></MoreHorizontal> 
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Modal for Update/Delete */}
        {selectedListing && (
          <ListingModal
            listing={selectedListing}
            onClose={handleClose}
            onDelete={async (id) => {
              if (!window.confirm("Are you sure you want to delete this listing?")) return;
              try {
                await API.delete(`/products/${id}`, {
                  withCredentials: true,
                });
                setMyListings((prev) =>
                  prev.filter((l) => l.id !== id)
                );
                handleClose();
              } catch (err) {
                console.error("Delete failed", err);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;