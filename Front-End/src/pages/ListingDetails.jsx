import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { SidebarContext } from "../context/SidebarContex";
import ReportModal from "../components/ReportModel";

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const { collapsed } = useContext(SidebarContext);
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();
  
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    API.get(`/products/${id}`)   
      .then((res) => {
        setListing(res.data);
        console.log(res.data);
        if (res.data && res.data.user_id) {
          fetchCreatorDetails(res.data.user_id);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching listing details", error);
        setLoading(false);
      });
  }, [id]);

  const fetchCreatorDetails = (creatorId) => {
    API.get(`/users/user/${creatorId}`)
      .then((res) => {
        setCreator(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching creator details", error);
        setLoading(false);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const openReportModal = () => {
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
  };

  const getListingTypeDisplay = (listingType) => {
    switch(listingType) {
      case 'sell': return 'For Sale';
      case 'rent': return 'For Rent';
      case 'both': return 'Sale & Rent';
      default: return 'For Sale';
    }
  };

  const getListingTypeColor = (listingType) => {
    switch(listingType) {
      case 'sell': return 'bg-green-500/20 text-green-400';
      case 'rent': return 'bg-blue-500/20 text-blue-400';
      case 'both': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-green-500/20 text-green-400';
    }
  };

  const renderPriceSection = () => {
    if (!listing) return null;

    const { listing_type, sell_price, rent_price } = listing;

    switch(listing_type) {
      case 'sell':
        return (
          <div className="mb-4">
            <span className="text-green-400 text-2xl font-bold">₹{sell_price}</span>
            <span className="text-gray-400 text-sm ml-2">Sale Price</span>
          </div>
        );
      case 'rent':
        return (
          <div className="mb-4">
            <span className="text-blue-400 text-2xl font-bold">₹{rent_price}</span>
            <span className="text-gray-400 text-sm ml-2">Rent Price</span>
          </div>
        );
      case 'both':
        return (
          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-green-400 text-xl font-bold">₹{sell_price}</span>
                <span className="text-gray-400 text-sm ml-2">to Buy</span>
              </div>
              <div className="text-gray-500">or</div>
              <div>
                <span className="text-blue-400 text-xl font-bold">₹{rent_price}</span>
                <span className="text-gray-400 text-sm ml-2">to Rent</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen mt-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white transition-all duration-300 ${
        collapsed ? "ml-[70px]" : "ml-[260px]"
      }`}>
        <div className="max-w-7xl mx-auto p-6 md:p-8 flex items-center justify-center min-h-[80vh]">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-cyan-400 text-xl font-semibold">
              Loading Listing Details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className={`min-h-screen mt-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white transition-all duration-300 ${
        collapsed ? "ml-[70px]" : "ml-[260px]"
      }`}>
        <div className="max-w-7xl mx-auto p-6 md:p-8 flex items-center justify-center min-h-[80vh]">
          <div className="bg-gray-800/50 rounded-xl p-10 text-center border border-gray-700 max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-2">Listing Not Found</h2>
            <p className="text-gray-400 mb-6">The listing you're looking for might have been removed or doesn't exist.</p>
            <button 
              onClick={handleGoBack}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition"
            >
              Go Back to Listings
            </button>
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
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Listings
          </button>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700/50">
          <div className="lg:flex">
            <div className="lg:w-1/2 relative">
              {listing.image_url ? (
                <img
                  src={listing.image_url}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  style={{ maxHeight: '500px' }}
                />
              ) : (
                <div className="w-full h-96 bg-gray-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-6 lg:hidden">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white mb-2">{listing.title}</h1>
                    {renderPriceSection()}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ml-4 ${getListingTypeColor(listing.listing_type)}`}>
                    {getListingTypeDisplay(listing.listing_type)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-8 lg:p-10">
              <div className="hidden lg:block">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                    {listing.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getListingTypeColor(listing.listing_type)}`}>
                    {getListingTypeDisplay(listing.listing_type)}
                  </span>
                  <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Posted {new Date(listing.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">{listing.title}</h1>
                {renderPriceSection()}
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                <p className="text-gray-300 leading-relaxed">
                  {listing.description || "No description provided."}
                </p>
              </div>

              <div className="mt-8 border-t border-gray-700 pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Seller Information</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{creator ? creator.name : 'Loading...'}</h4>
                    <p className="text-gray-399 text-sm">Member since {creator ? new Date(creator.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Loading...'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-gray-300">{creator ? creator.email : 'Loading...'}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{creator && creator.location ? creator.location : 'Noida, India'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {listing.listing_type === 'both' ? (
                  <>
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zM8 6V5a2 2 0 114 0v1H8zm2 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      Buy Now (₹{listing.sell_price})
                    </button>
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      Rent (₹{listing.rent_price})
                    </button>
                  </>
                ) : (
                  <button className={`flex-1 ${
                    listing.listing_type === 'rent' 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center`}>
                    {listing.listing_type === 'rent' ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Rent Now
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zM8 6V5a2 2 0 114 0v1H8zm2 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        Buy Now
                      </>
                    )}
                  </button>
                )}
                <button className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button 
                  className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={openReportModal}
                  aria-label="Report this listing"
                  title="Report this listing"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Similar Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* This would be populated from API with similar listings */}
            {Array(4).fill(0).map((_, idx) => (
              <div key={idx} className="bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-cyan-900/20 transition-all duration-300 cursor-pointer border border-gray-700/50">
                <div className="h-40 bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-5 bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReportModal
        isOpen={showReportModal}
        onClose={closeReportModal}
        listingId={id}
      />
    </div>
  );
};

export default ListingDetails;