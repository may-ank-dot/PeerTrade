import React, { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import SplitText from "../components/inComp/SplitText";
import { SidebarContext } from "../context/SidebarContex";
import { Upload, AlertCircle } from "react-feather";

const UpdateListings = () => {
    const { collapsed } = useContext(SidebarContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
    });

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");

    const categories = [
        "Books", "Electronics", "Fashion", "Stationery", 
        "Gadgets", "Sports Gear", "Services", "Furniture", "Other"
    ];

    // Fetch existing listing details
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const { data } = await API.get(`/products/${id}`);
                setFormState({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                });
                setImagePreview(data.imageUrl); // Ensure backend sends image URL
            } catch (err) {
                setError("Failed to fetch listing details.");
                console.error(err);
            }
        };
        fetchListing();
    }, [id]);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formState.title || !formState.description || !formState.price || !formState.category) {
            setError("All fields except image are required.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("title", formState.title);
        formData.append("description", formState.description);
        formData.append("price", formState.price);
        formData.append("category", formState.category);
        if (image) formData.append("image", image);

        try {
            await API.put(`/products/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/listings");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update listing.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen mt-12 bg-gradient-to-b from-gray-900 to-black text-white transition-all duration-300 ${
            collapsed ? "ml-[70px]" : "ml-[260px]"
        }`}>
            <div className="max-w-3xl mx-auto p-6 md:p-8">
                <div className="bg-gray-800/50 rounded-2xl p-8 shadow-lg border border-double border-cyan-900/30">
                    <h2 className="text-center mb-8">
                        <SplitText text="Update Listing" className="text-5xl tracking-tighter text-cyan-400" />
                    </h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center text-red-300">
                            <AlertCircle size={20} className="mr-2" />
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="What are you listing?"
                                value={formState.title}
                                onChange={handleChange}
                                className="inputClass"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                placeholder="Describe your item in detail"
                                value={formState.description}
                                onChange={handleChange}
                                className="inputClass"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formState.price}
                                    onChange={handleChange}
                                    className="inputClass"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formState.category}
                                    onChange={handleChange}
                                    className="inputClass"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Product Image</label>
                            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500 transition-all">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="mx-auto h-48 object-contain rounded-lg mb-4" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <Upload size={40} className="text-gray-400 mb-2" />
                                        <p className="text-gray-400 mb-2">Click or drag to upload an image</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-cyan-500/30 file:text-cyan-400 hover:file:bg-cyan-500/40 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all hover:scale-105 duration-300 ease-in-out shadow-lg hover:shadow-cyan-500/20 disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {loading ? "Updating..." : "Update Listing"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        Cancel and go back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateListings;
