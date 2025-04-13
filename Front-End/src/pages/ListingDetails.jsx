import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ListingDetails = () => {
    const {id} = useParams();
    const [listDetails, setListDetails] = useState(null);
    useEffect(()=>{
        API.get(`/products/${id}`)
        .then((res)=>{
            setListDetails(res.data);
        })
        .catch((error)=>{
            console.error("Error fetching listings by id",error);
        })
    },[id]);
    if(!listDetails) return <p>Loading...</p>
    return(
    <div className="p-4">
        <h1 className="text-2xl font-bold">{listDetails.title}</h1>
        <p className="mt-2">{listDetails.description}</p>
        <p className="text-green-600 mt-2 font-semibold">{listDetails.price}</p>
    </div>)
}

export default ListingDetails;