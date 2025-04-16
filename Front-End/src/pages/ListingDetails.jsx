import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ListingDetails = () => {
    const {id} = useParams();
    const [listDetails, setListDetails] = useState({});
    useEffect(()=>{
        API.get(`/products/${id}`)
        .then((e)=>{
            setListDetails(e.data);
        })
        .catch((error)=>{
            console.error("Error fetching List details",error);
        });
    },[id]);
    if(!listDetails) return <p className="text-center mt-8">Loading...</p>
    return(
    <div className="max-w-2x1 mx-auto mt-8 p-6 border rounded">
        <img src="{listDetails.image_url}" alt="{listDetails.title}" className="w-full h-64 object-cover mb-4 rounded" />
        <h2 className="text-2xl font-semibold mb-2">{listDetails.title}</h2>
        <p className="mb-2">{listDetails.description}</p>
        <p className="font-semibold text-gray-600">Category{listDetails.category}</p>
        <p className="text-xl font-bold text-blue-600 mt-2">₹{listDetails.price}</p>
    </div>)
}

export default ListingDetails;