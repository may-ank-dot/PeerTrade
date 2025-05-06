import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET;
const login = async (req,res) => {
    const {email,password} = req.body;

    const user = await getUserByEmail(email);
    if(!user) return res.status(401).json({message: "Invalid name or password"});

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(401).json({message: "Invalid name or password"});

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        JWT_SECRET,
        {expiresIn: '1h'}
    );
    console.log("Generated Jwt token",token);

    res.json(
        {
            token,
            user:{id: user.id, name: user.name, email: user.email}
        }
    )
}
export {login};