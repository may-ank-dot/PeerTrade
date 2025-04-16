import React,{useEffect,useState} from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
const Listings = () => {
  const [Listing,setListing] = useState([]);
  useEffect(() => {
    API.get("/products")
    .then((res)=>{
      setListing(res.data);
    })
    .catch((error)=>{
      console.error("Error Fectching listings",error);
    })
  },[]) 
    return(<div className="bg-red-300">
      <div className="p-4 mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold mb-4">Latest Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Listing.map((listing)=>(
            <div key={listing.id} className="border bg-purple-200 p-4 rounded shadow">
              {listing.image_url &&(
                <img
                  src={listing.image_url}
                  alt={listing.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-semibold">{listing.title}</h2> 
              <p className="text-sm text-gray-600 mb-1">{listing.description}</p>
              <p className="text-green-600 font-bold mt-2">₹{listing.price}</p>
              <Link to={`/listings/${listing.id}`} className="text-sm text-indigo-600 hover:underline mt-2 inline-block">View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>)
}

export default Listings;