import express from "express";
import {userDetails, getUserByEmail, createUser } from "../models/user.js";
import passport from "../middleware/passportConfig.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";

const router = express.Router();
router.post("/register", async(req,res)=>{
    const {name , email, password} = req.body;   
    try{
        const userExists = await getUserByEmail(email);
        if(userExists) return res.status(400).json({message: "User already exists!"});
        const newUser = await createUser(name,email,password);
        res.status(201).json({user: newUser});
    } catch (error){
        res.status(500).json({error: "failed to create user"});
    }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json({ user: req.user });
});

router.post("/logout", (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ error: "Logout failed" });
        res.json({ message: "Logged out successfully" });
    });
});

// Creating get route to get user details via user_id
router.get("/user/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const user = await userDetails(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Error getting userDetails"});
    }
    

})

router.get("/me",ensureAuthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ user: null });
    }
});

export default router;