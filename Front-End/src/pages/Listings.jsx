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
    return(<div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Latest Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap4">
          {Listing.map((listing)=>(
            <div key={listing.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{listing.title}</h2> 
              <p>{listing.description}</p>
              <p className="text-green-600 font-bold mt-2">{listing.price}</p>
              <Link to={`/listings/${listing.id}`} className="text-blue-600 hover:underline mt-2 inline-block">View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>)
}

export default Listings;