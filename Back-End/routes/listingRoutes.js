import express from "express";
import { createListings, searchListings, getAllListings, deleteListings, getListingById, getListingByUserId, updateListingById } from "../models/listing.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";
import upload from "../middleware/cloudinaryStorage.js";
import cloudinary from "../middleware/cloudinary.js";
const router = express.Router();

router.post("/", ensureAuthenticated, upload.single("image"), async (req, res) => {
    const { title, description, price, category } = req.body;
    const image_url = req.file.path;
    const public_id = req.file.filename;
    const user_id = req.user.id;
    try {
        const newListing = await createListings(title, description, price, category, public_id, image_url, user_id);
        res.status(201).json({ listing: newListing });
    } catch (error) {
        res.status(500).json({ error: "Failed to create Listing!" });
    }
});

router.get("/", async (req, res) => {
    try {
        const listings = await getAllListings();
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ error: "Error fetching lisiting!" });
    }
});

router.get("/search", async (req, res) => {
    try {
        const { query, category } = req.query;
        const listings = await searchListings(query, category);
        res.status(200).json(listings);
    } catch (error) {
        console.error("Backend error in /search route", error.message);
        res.status(500).json({ error: "Error Fetching data for search" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getListingById(id);
        if (!result || result.rows.length === 0) return res.status(404).json({ error: 'Listings not found' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching listing:", error);
        res.status(500).json({ error: "error getting listing by id" });
    }
});

router.get("/my/:id", ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const listings = await getListingByUserId(userId);
        res.json(listings);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user listings" });
    }
});

router.put("/update/:id", ensureAuthenticated, upload.single("image"), async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, price, category } = req.body;
        
        const currentListing = await getListingById(id);
        if (!currentListing || currentListing.rows.length === 0) {
            return res.status(404).json({ error: "Listing not found" });
        }
        
        let image_url = currentListing.rows[0].image_url;
        let public_id = currentListing.rows[0].public_id;
        
        if (req.file) {
            if (currentListing.rows[0].public_id) {
                try {
                    await cloudinary.uploader.destroy(currentListing.rows[0].public_id);
                } catch (cloudinaryError) {
                    console.error("Error deleting old image:", cloudinaryError);
                    // Continue with the update even if image deletion fails
                }
            }
            
            image_url = req.file.path;
            public_id = req.file.filename;
        }
        
        const updated = await updateListingById(id, title, description, price, category, image_url, public_id);
        
        if (!updated) {
            return res.status(500).json({ error: "Failed to update listing" });
        }
        
        res.status(200).json(updated);
    } catch (error) {
        console.error("Updating listing failed", error);
        res.status(500).json({ error: "Failed to update listing", details: error.message });
    }
});

router.delete("/:id", ensureAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await getListingById(id);
        if (!listing || listing.rows.length === 0) return res.status(404).json({ error: "Listing not found!" });
        
        const publicId = listing.rows[0].public_id;
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
        
        await deleteListings(id);
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        console.error("Error deleting listing", error);
        res.status(500).json({ error: "Failed to delete listing" });
    }
});

export default router;