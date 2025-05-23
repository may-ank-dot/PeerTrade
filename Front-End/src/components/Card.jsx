import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/listings/${item.id}`);
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
      case 'sell': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rent': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'both': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const renderPriceSection = () => {
    const { listing_type, sell_price, rent_price } = item;

    switch(listing_type) {
      case 'sell':
        return (
          <div className="flex items-center justify-between">
            <span className="text-green-400 text-xl font-bold">₹{sell_price}</span>
            <span className="text-xs text-gray-500">Buy</span>
          </div>
        );
      case 'rent':
        return (
          <div className="flex items-center justify-between">
            <span className="text-blue-400 text-xl font-bold">₹{rent_price}</span>
            <span className="text-xs text-gray-500">Rent</span>
          </div>
        );
      case 'both':
        return (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-green-400 text-lg font-bold">₹{sell_price}</span>
              <span className="text-xs text-gray-500">Buy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-400 text-lg font-bold">₹{rent_price}</span>
              <span className="text-xs text-gray-500">Rent</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-between">
            <span className="text-cyan-400 text-xl font-bold">₹{item.price || sell_price}</span>
          </div>
        );
    }
  };

  return (
    <div 
      className="bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-cyan-900/20 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-cyan-500/30 group"
      onClick={handleCardClick}
    >
      <div className="relative h-48 overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getListingTypeColor(item.listing_type)}`}>
            {getListingTypeDisplay(item.listing_type)}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-gray-900/80 text-cyan-400 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {item.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="space-y-2">
          {renderPriceSection()}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">
          <div className="flex items-center text-gray-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {new Date(item.created_at || Date.now()).toLocaleDateString()}
          </div>
          
          <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;