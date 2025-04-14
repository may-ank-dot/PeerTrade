import React ,{useState}from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AddListings = () => {
    const [FormData,setFormData] = useState({
        title: "",
        description: "",
        price:"",
        category: "",
        image_url: "",
    })
    const navigate = useNavigate;
    const handleChange = (e) => {
        setFormData({...FormData,[e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await API.post('/products',FormData);
            navigate("/listings");
        } catch(error){
            console.error("Unable to create listings",error);
        }
    };
    return(
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow rounded">
            <h2 className="font-semibold text-xl mb-4">Create Listing</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    value={FormData.title} 
                    onChange={handleChange} 
                    className="border p-2 w-full"
                />
                <textarea
                    name="description" 
                    placeholder="Description" 
                    value={FormData.description} 
                    onChange={handleChange} 
                    className="border p-2 w-full"
                />
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Price" 
                    value={FormData.price} 
                    onChange={handleChange} 
                    className="border p-2 w-full"
                />
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Category" 
                    value={FormData.category} 
                    onChange={handleChange} 
                    className="border p-2 w-full"
                />
                <input 
                    type="text" 
                    name="image_url" 
                    placeholder="image URL" 
                    value={FormData.image_url} 
                    onChange={handleChange} 
                    className="border p-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
            </form>
        </div>
    )
}

export default AddListings;