import express from "express";
import { createListings,searchListings,getAllListings,deleteListings,getListingById,getListingByUserId,updateListingById} from "../models/listing.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js"
import upload from "../middleware/cloudinaryStorage.js";
import cloudinary from "../middleware/cloudinary.js";

const router = express.Router();
router.post("/",ensureAuthenticated,upload.single("image"), async (req,res) => {
    const {title, description, price, category } = req.body;
    const image_url = req.file.path;
    const public_id = req.file.filename;
    const user_id = req.user.id;
    try{
        const newListing = await createListings(title, description, price, category ,public_id, image_url,user_id);
        res.status(201).json({listing: newListing});
    } catch(error){
        res.status(500).json({error: "Failed to create Listing!"});
    }
});

router.get("/",async(req,res) => {
    try{
        const listings = await getAllListings();
        res.status(200).json(listings);
    } catch(error){
        res.status(500).json({error: "Error fetching lisiting!"});
    }
});

router.get("/search",async(req,res)=>{
    try{
        const {query,category} = req.query;
        const listings = await searchListings(query,category);
        res.status(200).json(listings);
    } catch(error){
        console.error("Backend error in /search route",error.message);
        res.status(500).json({error:"Error Fetching data for search"});
    }
    
});
router.get("/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const result = await getListingById(id); 
        if(!result || result.rows.length === 0) return res.status(404).json({error: 'Listings not found'});
        res.status(200).json({listing: result.rows[0]});
    } catch(error){
        console.error("Error fetching listing:",error)
        res.status(500).json({error:"error getting lsiting by id"});
    }
});
router.get("/my/:id",async(req,res)=>{
    try{
        const userId = req.user.id; 
        const listings = await getListingByUserId(userId);
        res.json(listings);
    } catch(error){
        res.status(500).json({error: "Failed to fetch user listings"});
    }
})
router.put("/update/:id",async(req,res) => {
    try{
        const id = req.params;
        const {title,description,price,category,image_url} = req.body;
        const updated = await updateListingById(id.id,title,description,price,category,image_url);
        res.status(201).json(updated);
    } catch (error) {
        console.error("Updating listing failed",error);
    }
});

router.delete("/:id",async(req,res) => {
    try{
        const {id} = req.params;
        const listing = await getListingById(id);
        if(!listing) return res.status(404).json({error: "Listing not found!"});

        const publicId = listing.public_id;
        if(publicId) {
            await cloudinary.uploader.destroy(publicId); 
        }
        await deleteListings(id);
        res.status(200).json({message:"Listing deleted successfully"})
    } catch(error){
        console.error("Error deleting listing",error);
        res.status(500).json({error: "Failed to delete listing"});
    }
})
export default router;