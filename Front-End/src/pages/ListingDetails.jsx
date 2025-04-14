import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ListingDetails = () => {
    const {id} = useParams();
    const [listDetails, setListDetails] = useState({});
    useEffect(()=>{
        const fetchListing = async() => {
            try{
                const response = await API.get(`/products/${id}`);
                setListDetails(response.data.listing);
            }catch(error){
                console.error("Failed to fetch lisiting",error);
            }
        }
        console.log(listDetails);
        fetchListing();
    },[id]);
    if(!listDetails) return <p>Loading...</p>
    return(
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded">
        <h2 className="text-2xl font-semibold mb-2">{listDetails.title}</h2>
        <img src="{listDetails.image_url}" alt="{listDetails.title}" className="w-full h-64 object-cover mb-4 rounded" />
        <p className="mb-2">{listDetails.description}</p>
        <p className="font-semibold text-gray-600">Category{listDetails.category}</p>
        <p className="text-xl font-bold text-blue-600 mt-2">₹{listDetails.price}</p>
    </div>)
}

export default ListingDetails;