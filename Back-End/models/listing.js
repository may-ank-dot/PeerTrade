import db from "../db/connect.js";

const createListings = async (title, description, price, category , image_url) => {
    try{
        const result = await db.query(
            "INSERT INTO listings(title,description,price,category,image_url) VALUES($1,$2,$3,$4,$5) RETURNIG *"
            ,[title , description, price,category,image_url]
        );
        return result.rows[0];
    } catch(error) {
        console.error("Something went Wrong!",error);
    }
}

const getAllListings = async () => {
    try{
        const result = await db.query("SELECT * FROM listings");
        return result.rows[0];
    } catch(error){
        console.error("Something went wrong",error);
    }
} 

export {createListings , getAllListings};