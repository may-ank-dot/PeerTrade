import express from "express";
import { createListings,getAllListings,deleteListings,getListingById,updateListingById} from "../models/listing.js";

const router = express.Router();

router.post("/", async (req,res) => {
    const {title, description, price, category , image_url} = req.body;
    try{
        const newListing = await createListings(title, description, price, category , image_url);
        res.status(201).json(newListing);
    } catch(error){
        res.status(500).json({error: "Failed to create Listing!"});
    }
});

router.get("/",async(req,res) => {
    try{
        const listings = await getAllListings();
        res.json(listings);
    } catch(error){
        res.status(500).json({error: "Error fetching lisiting!"});
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const id = req.params;
        const lisiting = await getListingById(id.id); 
        res.status(201).json(lisiting);
    } catch(error){
        res.status(500).json({error:"error getting lsiting by id"});
    }
});

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

router.delete("/delete/:id",async(req,res) => {
    try{
        const id = req.params;
        const deleted = await deleteListings(id.id);
        res.status(201).json({message:"Listing deleted successfully"})
    } catch(error){
        console.error("Error deleting listing",error);
    }
})
export default router;