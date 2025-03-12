import express from "express";
import { getUserByEmail,createUser } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async(req,res)=>{
    const {name , email,password} = req.body;   
    try{
        const userExists = await getUserByEmail(email);
        if(userExists) return res.status(400).json({message: "User already exists!"});
        const newUser = await createUser(name,email,password);
        res.status(201).json(newUser);
    } catch (error){
        res.status(500).json({error: "failed to create user"});
    }
});

router.post("/login", async(req,res) => {
    try{
        const {email , password} = req.body;
        // Finding user by email
        const user = await getUserByEmail(email);
        if(!user) { return res.status(400).json({message: "Invalid credentials"})}
        // Matching password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){ return res.status(400).json({message: "Invalid credentials"})}
        // Generate JWT token
        const token = jwt.sign({id: user.id,email: user.email},"jwt_token",{expiresIn: "1h"})
        res.json({message: "Login succesfull",token: token});
    } catch(error) {
        res.status(500).json({message: "Server error",error: error.message})
    }
})

router.get("/:email", async(req,res) => {
    try{
        const user = await getUserByEmail(req.params.email);
        if(!user){
            res.status(404).json({error: "user not found!"});
        }
        res.json(user);
    } catch(error) {
        res.status(500).json({error: "Error fetching user"});
    }
})

export default router;