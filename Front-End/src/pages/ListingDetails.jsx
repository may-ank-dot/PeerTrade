import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ListingDetails = () => {
    const {id} = useParams();
    const [listing, setListing] = useState({});
    useEffect(()=>{
        API.get(`/products/${id}`)
        .then((e)=>{
            setListing(e.data.listing);
        })
        .catch((error)=>{
            console.error("Error fetching List details",error);
        });
    },[id]);
    if(!listing) return <p className="text-center mt-8">Loading...</p>
    return(
        <div className="flex justify-center">
            <div className="max-w-2xl mx-auto mt-8 p-6 rounded">
            <img src={listing.image_url} alt={listing.title} className="w-100 h-50 mb-4 rounded" />
            <h2 className="text-2xl font-semibold mb-2">{listing.title}</h2>
            <p className="mb-2 text-gray-700">{listing.description}</p>
            <p className="font-semibold text-blue-600 text-lg mt-4">Category: {listing.category}</p>
            <p className="text-xl font-bold text-gray-600 mt-2">₹{listing.price}</p>
            </div>
        </div>
    )
}

export default ListingDetails;