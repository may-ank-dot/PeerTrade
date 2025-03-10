import express from "express";
import { createListings,getAllListings } from "../models/listing.js";

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

export default router;