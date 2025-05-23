import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { SidebarContext } from "../context/SidebarContex";
import ListingModal from "../components/ListingModal";
import { useNavigate } from "react-router-dom";
import { Plus, MoreHorizontal, Tag, Calendar } from "react-feather";

const Dashboard = () => {
  const [myListings, setMyListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalListings: 0,
    totalValue: 0
  });
  const { collapsed } = useContext(SidebarContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        setLoading(true);
        const res = await API.get("/products/my/:id");
        setMyListings(res.data);
        
        // Calculate stats (removed activeListings and totalViews)
        const totalListings = res.data.length;
        const totalValue = res.data.reduce((sum, item) => {
          const sellPrice = parseFloat(item.sell_price) || 0;
          const rentPrice = parseFloat(item.rent_price) || 0;
          return sum + Math.max(sellPrice, rentPrice);
        }, 0);

        setStats({
          totalListings,
          totalValue
        });
      } catch (err) {
        console.error("Failed to fetch your listings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  // Close modal
  const handleClose = () => setSelectedListing(null);

  // Format price display
  const formatPrice = (item) => {
    const sellPrice = parseFloat(item.sell_price);
    const rentPrice = parseFloat(item.rent_price);
    
    if (item.listing_type === 'sell' && sellPrice) {
      return `₹${sellPrice.toLocaleString()}`;
    } else if (item.listing_type === 'rent' && rentPrice) {
      return `₹${rentPrice.toLocaleString()}/mo`;
    } else if (item.listing_type === 'both' && sellPrice && rentPrice) {
      return `₹${sellPrice.toLocaleString()} | ₹${rentPrice.toLocaleString()}/mo`;
    }
    return "Price not set";
  };

  // Get listing type badge color
  const getListingTypeBadge = (type) => {
    const badges = {
      sell: "bg-green-500/20 text-green-400 border-green-500/30",
      rent: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      both: "bg-purple-500/20 text-purple-400 border-purple-500/30"
    };
    return badges[type] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const getListingTypeLabel = (type) => {
    const labels = {
      sell: "For Sale",
      rent: "For Rent",
      both: "Sale & Rent"
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className={`min-h-screen mt-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white transition-all duration-300 ${
        collapsed ? "ml-[70px]" : "ml-[260px]" 
      }`}>
        <div className="max-w-7xl mx-auto p-6 md:p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-gray-800 h-24 rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl">
                  <div className="h-48 bg-gray-700 rounded-t-xl"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-5 bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen mt-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white transition-all duration-300 ${
      collapsed ? "ml-[70px]" : "ml-[260px]" 
    }`}>
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Header with stats */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                My Dashboard
              </h1>
              <p className="text-gray-400 text-sm">
                Manage your listings and track performance
              </p>
            </div>
            <button
              onClick={() => navigate("/addlistings")}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center hover:scale-105"
            >
              <Plus size={20} className="mr-2" />
              Add New Listing
            </button>
          </div>

          {/* Stats Cards - Reduced to 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Listings</p>
                  <p className="text-2xl font-bold text-cyan-400">{stats.totalListings}</p>
                </div>
                <Tag className="text-cyan-400" size={24} />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Portfolio Value</p>
                  <p className="text-2xl font-bold text-yellow-400">₹{stats.totalValue.toLocaleString()}</p>
                </div>
                <Calendar className="text-yellow-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {myListings.length === 0 ? (
          <div className="bg-gray-800/50 rounded-2xl p-12 text-center border border-gray-700/50 backdrop-blur-sm">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Tag size={32} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">No listings yet</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Start building your marketplace presence by creating your first listing. 
                It's quick and easy!
              </p>
              <button 
                onClick={() => navigate("/addlistings")}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
              >
                Create Your First Listing
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Your Listings</h2>
              <div className="flex gap-2">
                <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option>All Listings</option>
                  <option>For Sale</option>
                  <option>For Rent</option>
                  <option>Both</option>
                </select>
                <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option>Newest First</option>
                  <option>Price: High to Low</option>
                  <option>Price: Low to High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-cyan-900/20 transition-all duration-300 border border-gray-700/50 hover:border-cyan-500/30 group backdrop-blur-sm"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                    
                    {/* Listing Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getListingTypeBadge(item.listing_type)}`}>
                        {getListingTypeLabel(item.listing_type)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-white truncate flex-1 mr-2">
                        {item.title}
                      </h3>
                      <button 
                        onClick={() => setSelectedListing(item)}
                        className="text-gray-400 hover:text-white transition-colors duration-200 p-1 hover:bg-gray-700/50 rounded-lg"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-lg text-xs font-medium">
                        {item.category}
                      </span>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        item.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {item.status || 'Active'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-cyan-400 font-bold text-lg">
                        {formatPrice(item)}
                      </div>
                      
                      {/* Detailed Price Breakdown for 'both' type */}
                      {item.listing_type === 'both' && (
                        <div className="text-sm text-gray-400 space-y-1">
                          {item.sell_price && (
                            <div className="flex justify-between">
                              <span>Sale Price:</span>
                              <span className="text-green-400">₹{parseFloat(item.sell_price).toLocaleString()}</span>
                            </div>
                          )}
                          {item.rent_price && (
                            <div className="flex justify-between">
                              <span>Rent Price:</span>
                              <span className="text-blue-400">₹{parseFloat(item.rent_price).toLocaleString()}/mo</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {item.created_at && (
                        <div className="text-xs text-gray-500 mt-2">
                          Listed {new Date(item.created_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {/* Modal for Update/Delete */}
        {selectedListing && (
          <ListingModal
            listing={selectedListing}
            onClose={handleClose}
            onDelete={async (id) => {
              if (!window.confirm("Are you sure you want to delete this listing?")) return;
              try {
                await API.delete(`/products/${id}`);
                setMyListings((prev) => prev.filter((l) => l.id !== id));
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