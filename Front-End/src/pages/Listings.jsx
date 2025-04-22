import React,{use, useEffect,useState} from "react";
import API from "../services/api";
import { Link , useNavigate } from "react-router-dom";
const Listings = () => {
  const [Listing,setListing] = useState([]);
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    API.get("/products")
    .then((res)=>{
      setListing(res.data);
    })
    .catch((error)=>{
      console.error("Error Fectching listings",error);
    })
  },[]) 
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/listings/search?query=${query}&category=${category}`);
  };
    return(<div className="p-4 bg-gray-900 text-white h-screen">
      <form onSubmit={handleSearch} className="flex gap-4 mb-4">
        <input 
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          className="border border-white px-2 py-1"
        />
        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="" className="searchCategory">All Categories</option>
          <option value="books" className="searchCategory">Books</option>
          <option value="electronics" className="searchCategory">Electronics</option>
          <option value="fashion" className="searchCategory">Fashion</option>
          <option value="services" className="searchCategory">Services</option>
        </select> 
        <button className="bg-blue-500 text-white px-4 py-1 rounded">Search</button>
      </form>
      <div className="p-4 mx-auto">
        <h1 className="text-2xl  font-semibold mb-4">Latest Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Listing.map((listing)=>(
            <div key={listing.id} className="border bg-gray-600 p-4 rounded shadow">
              {listing.image_url &&(
                <img
                  src={listing.image_url}
                  alt={listing.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-semibold">{listing.title}</h2> 
              <p className="text-sm text-white mb-1">{listing.description}</p>
              <p className="text-green-600 font-bold mt-2">₹{listing.price}</p>
              <Link to={`/listings/${listing.id}`} className="text-sm text-red-500 hover:underline mt-2 inline-block">View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>)
}

export default Listings;