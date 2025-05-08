import db from "../db/connect.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const createUser = async ( name, email, password ) => {
    try{
        bcrypt.hash(password,saltRounds,async(err,hash)=>{
            const result = await db.query("INSERT INTO users(name , email, password) VALUES($1,$2,$3) RETURNING *",
                [name ,email ,hash]
            );
            return result.rows[0];
        })
    } catch(error){
        console.log("Something went wrong!",error);
    }
};

const userDetails = async(id) => {
    try{
        const result = await db.query("SELECT * FROM users WHERE id=$1",[id]);
        return result.rows[0];
    } catch(error){
        console.log("Error fetching user details: ",error);
    }
}

const getUserByEmail = async(email) => {
    try{
        const result = await db.query("SELECT * FROM users WHERE email = $1",[email]);
        return result.rows[0];
    } catch (error){
        console.log("Something went wrong!",error);
    }
}
export {createUser , getUserByEmail, userDetails};