import React ,{useState}from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import SplitText from "../components/inComp/SplitText";
const AddListings = () => {
    const [formState,setFormState] = useState({
        title: "",
        description: "",
        price:"",
        category: "",
    })
    const [image,setImage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormState({...formState,[e.target.name]: e.target.value});
    };
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title",formState.title);
        formData.append("description",formState.description);
        formData.append("price",formState.price);
        formData.append("category",formState.category);
        formData.append("image",image);
        try{
            const response = await API.post('/products',formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/listings");
        } catch(error){
            console.error("Unable to create listings",error);
        }
    };
    return(
        <div className="max-w-lg mx-auto mt-20 p-6 shadow rounded">
            <h2 className="lex text-5xl text-center mb-0 tracking-tighter">
                <SplitText text="Create Listings"/>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    value={formState.title} 
                    onChange={handleChange} 
                    className="inputClass"
                />
                <textarea
                    name="description" 
                    placeholder="Description" 
                    value={formState.description} 
                    onChange={handleChange} 
                    className="inputClass"
                />
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Price" 
                    value={formState.price} 
                    onChange={handleChange} 
                    className="inputClass"
                />
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Category" 
                    value={formState.category} 
                    onChange={handleChange} 
                    className="inputClass"
                />
                <input 
                    type="file" 
                    name="image" 
                    onChange={handleImageChange} 
                    className="inputClass"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
            </form>
        </div>
    )
}

export default AddListings;