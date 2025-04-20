import db from "../db/connect.js";
const createListings = async (title, description, price, category , image_url,user_id) => {
    try{
        const result = await db.query(
            "INSERT INTO listings(title,description,price,category,image_url,user_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *"
            ,[title , description, price,category,image_url,user_id]
        );
        return result.rows[0];
    } catch(error) {
        console.error("Something went Wrong!",error);
    }
}

const getAllListings = async () => {
    try{
        const result = await db.query("SELECT * FROM listings ORDER BY id DESC");
        return result.rows;
    } catch(error){
        console.error("Get listing not working",error);
    }
} 
const getListingByUserId = async(userId) => {
    try{
        const result = await db.query(`SELECT * FROM listings WHERE user_id = $1`, [userId])
        return result.rows; 
    } catch (error){
        console.error("Error Listing user by id",error);
    }
}

const getListingById = async (id) => {
    try{
        const result = await db.query("SELECT * FROM listings WHERE id = $1",[id]);
        return result;
    } catch(error){
        console.error("Listing by id not working",error);
    }
} 

const updateListingById = async (id,title,description,price,category,image_url) => {
    try{
        const result = 
            await db.query(
                "UPDATE listings SET title=$1,description=$2,price=$3,category=$4,image_url=$5 WHERE id=$6 RETURNING *",
            [title,description,price,category,image_url,id]);
            return result.rows[0];
    } catch(error){
        console.error("Error while updating Listings",error);
    }
}

// Searching and filtering 
const searchListings = async (query,category) =>{
    try{
        let sql = "SELECT * FROM listings WHERE 1=1";   
        const values = [];
        if(query){
            sql += " AND (title ILIKE $1 OR description ILIKE $2)";
            values.push(`%${query}%`,`%${query}%`);
        }
        if(category){
            sql += query ? "AND category = $3" : "AND category = $1";
            values.push(category);
        }
        const result = await db.query(sql,values);
        return result.rows;
    } catch(error){
        console.error("Error while fetching data for search listing");
        throw error;
    }
    
}

const deleteListings = (id) => {
    try{
        const result = db.query("DELETE FROM listings WHERE id=$1 ",[id]);
        return result.rows;
    }catch(error) {
        console.error("error while deleting listing",error);
    }
}

// Reporting inappropriate listing (not now)
export {createListings,searchListings , getAllListings, getListingById, deleteListings, updateListingById, getListingByUserId};