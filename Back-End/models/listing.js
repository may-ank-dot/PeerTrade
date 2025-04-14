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
        const result = await db.query("SELECT * FROM listings");
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

const deleteListings = (id) => {
    try{
        const result = db.query("DELETE FROM listings WHERE id=$1 ",[id]);
        return result.rows;
    }catch(error) {
        console.error("error while deleting listing",error);
    }
}

// Reporting inappropriate listing (not now)
export {createListings , getAllListings, getListingById, deleteListings, updateListingById, getListingByUserId};