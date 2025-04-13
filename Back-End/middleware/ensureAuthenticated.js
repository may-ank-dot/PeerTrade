const ensureAuthenticated = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).json({message: "unauthorized. Please log in"});
}
export default ensureAuthenticated;