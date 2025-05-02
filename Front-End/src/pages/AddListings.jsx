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
    const [loading , setLoading] = useState(false);
    const [image,setImage] = useState(null);
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormState({...formState,[e.target.name]: e.target.value});
    };
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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
            setError("Fields cannot be empty!");
            console.error("Unable to create listings",error);
        } finally {
            setLoading(false);
        }
    };
    return(
        <div className="max-w-lg mx-auto mt-20 p-6 shadow rounded">
            <h2 className="lex text-5xl text-center mb-0 tracking-tighter">
                <SplitText text="Create Listings"/>
            </h2>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
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
                <button className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all hover:scale-105 duration-300 ease-in-out"
                    disabled={loading}>
                    {loading ? "Creating..." : "Create" } 
                </button>
            </form>
        </div>
    )
}

export default AddListings;