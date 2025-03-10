import express from "express";
import { getUserByEmail,createUser } from "../models/user.js";

const router = express.Router();

router.post("/register", async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try{
        const newUser = await createUser(name,email,password);
        res.status(201).json(newUser);
    } catch (error){
        res.status(500).json({error: "failed to create user"});
    }
});

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