import React, { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import SplitText from "../components/inComp/SplitText";
import { SidebarContext } from "../context/SidebarContex";
import { AlertCircle, Upload } from "react-feather";
import { useAuth } from "../context/AuthContext"; // if needed

const UpdateListings = () => {
  const { collapsed } = useContext(SidebarContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { authLoading } = useAuth(); 

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    listing_type: "sell", // sell, rent, or both
    sell_price: "",
    rent_price: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const categories = [
    "Books", "Electronics", "Fashion", "Stationery",
    "Gadgets", "Sports Gear", "Services", "Furniture", "Other"
  ];

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        
        const data = response.data;
        console.log("Fetched listing data:", data);
        
        setFormState({
          title: data.title || "",
          description: data.description || "",
          listing_type: data.listing_type || "sell",
          sell_price: data.sell_price || "",
          rent_price: data.rent_price || "",
          category: data.category || "",
        });
        
        if (data.image_url) {
          setImagePreview(data.image_url);
        }
      } catch (err) {
        console.error("Error fetching listing:", err);
        let errorMessage = "Failed to fetch listing details.";
        
        if (err.response?.data?.error) {
          errorMessage += " " + err.response.data.error;
        } else if (err.message) {
          errorMessage += " " + err.message;
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) fetchListing();
  }, [id, authLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    
    // Clear price fields when listing type changes
    if (name === "listing_type") {
      if (value === "sell") {
        setFormState(prev => ({...prev, [name]: value, rent_price: ""}));
      } else if (value === "rent") {
        setFormState(prev => ({...prev, [name]: value, sell_price: ""}));
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 11 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      
      // Validate file type
      if (!file.type.match('image.*')) {
        setError("Please select an image file");
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setError(""); // Clear any previous errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { title, description, listing_type, sell_price, rent_price, category } = formState;
    
    if (!title || !description || !listing_type || !category) {
      setError("Title, description, listing type, and category are required.");
      return;
    }

    // Validate prices based on listing type
    if (listing_type === "sell" && !sell_price) {
      setError("Sell price is required for sale listings");
      return;
    }
    if (listing_type === "rent" && !rent_price) {
      setError("Rent price is required for rental listings");
      return;
    }
    if (listing_type === "both" && (!sell_price || !rent_price)) {
      setError("Both sell and rent prices are required for dual listings");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("listing_type", listing_type);
    formData.append("category", category);
    
    if (sell_price) formData.append("sell_price", sell_price);
    if (rent_price) formData.append("rent_price", rent_price);
    
    if (image) {
      formData.append("image", image);
    }

    try {
      const updatePath = `/products/update/${id}`;
      console.log("Update request path:", updatePath);
      console.log("Sending form data with fields:", {
        title,
        description,
        listing_type,
        sell_price,
        rent_price,
        category,
        hasImage: !!image
      });
      
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + (pair[0] === 'image' ? 'File data' : pair[1]));
      }
      const response = await API.put(updatePath, formData);
      
      console.log("Update response:", response.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating listing:", err);
      
      let errorMessage = "Failed to update listing.";
      if (err.response) {
        // Server responded with an error
        console.log("Error response data:", err.response.data);
        console.log("Error response status:", err.response.status);
        
        if (typeof err.response.data === 'object' && err.response.data !== null) {
          if (err.response.data.error) {
            errorMessage = `Error: ${err.response.data.error}`;
            if (err.response.data.details) {
              errorMessage += ` (${err.response.data.details})`;
            }
          } else {
            errorMessage = `Server error (${err.response.status}): ${JSON.stringify(err.response.data)}`;
          }
        } else if (err.response.data) {
          errorMessage = `Server error (${err.response.status}): ${err.response.data}`;
        } else {
          errorMessage = `Server error status: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage = "No response received from server. Please check your connection.";
      } else {
        errorMessage = err.message || "An unknown error occurred";
      }
      
      setError(errorMessage);
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

          {loading ? (
            <div className="text-center text-gray-300 py-8">Loading listing...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={formState.description}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              {/* Listing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Listing Type</label>
                <select
                  name="listing_type" 
                  value={formState.listing_type} 
                  onChange={handleChange} 
                  className="w-full bg-gray-700/50 border border-gray-600 focus:border-cyan-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                >
                  <option value="sell">For Sale</option>
                  <option value="rent">For Rent</option>
                  <option value="both">Both Sale & Rent</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sell Price */}
                {(formState.listing_type === "sell" || formState.listing_type === "both") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Sale Price (₹)
                    </label>
                    <input
                      type="number"
                      name="sell_price"
                      value={formState.sell_price}
                      onChange={handleChange}
                      className="w-full bg-gray-700/50 border border-gray-600 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>
                )}

                {/* Rent Price */}
                {(formState.listing_type === "rent" || formState.listing_type === "both") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Rent Price (₹/month)
                    </label>
                    <input
                      type="number"
                      name="rent_price"
                      value={formState.rent_price}
                      onChange={handleChange}
                      className="w-full bg-gray-700/50 border border-gray-600 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>
                )}

                {/* Category */}
                <div className={formState.listing_type === "both" ? "" : "md:col-span-2"}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    name="category" 
                    value={formState.category} 
                    onChange={handleChange} 
                    className="w-full bg-gray-700/50 border border-gray-600 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Product Image (Max: 10 MB)</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500 transition-all">
                  {imagePreview ? (
                    <div>
                      <img src={imagePreview} alt="Preview" className="mx-auto h-48 object-contain rounded-lg mb-4" />
                      <p className="text-sm text-gray-400 mb-2">
                        {image ? "New image selected" : "Current image (leave empty to keep)"}
                      </p>
                    </div>
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
          )}
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