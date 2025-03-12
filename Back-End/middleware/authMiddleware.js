import jwt from "jsonwebtoken";

const authenticateToken = (req,res,next) => {
    const token  = req.header("Authorization");
    if(!token) return res.status(401).json({message: "Access denied"});
    try{
        const verified = jwt.verify(token,"jwt_secret");
        req.user = verified;
        next();
    } catch(error) {
        res.status(400).json({message: "Invalid token"});
    }
};

export default authenticateToken;