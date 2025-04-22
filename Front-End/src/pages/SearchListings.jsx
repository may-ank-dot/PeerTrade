import React,{useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const SearchListings = () => {
    const query = useQuery();
    const search = query.get("query");
    const category = query.get("category");
    const [listings,setListings] = useState([]);
    
    useEffect(()=>{
        API.get(`/products/search?query=${search|| ""}&category=${category || ""}`)
        .then((res)=> setListings(res.data))
        .catch((error) => console.error("Error Fetching data using Search",error));
    },[search,category]);
    return(
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Search Result</h2>
            {listings.length === 0 ? (
                <p>No listings found</p>
            ) : (
                listings.map((listing)=>(
                    <div key={listing.id} className="border p-4 mb-4">
                        <h3 className="text-xl font-semibold">{listing.title}</h3>
                        <p>{listing.description}</p>
                        <p>{listing.price}</p>
                        <p className="text-sm text-gray-500">{listing.category}</p>
                        <img src={listing.image_url} alt={listing.title} className="w-32 mt-2"/>
                    </div>
                ))
            )}
        </div>
    )
}

export default SearchListings; 