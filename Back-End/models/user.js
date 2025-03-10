import db from "../db/connect.js";

const createUser = async ( name, email, password ) => {
    try{
        const result = await db.query("INSERT INTO users(name , email, password) VALUES($1,$2,$3) RETURNING *",
            [name ,email ,password]
        );
        return result.rows[0];
    } catch(error){
        console.log("Something went wrong!",error);
    }
};

const getUserByEmail = async(email) => {
    try{
        const result = await db.query("SELECT * FROM users WHERE email = $1",[email]);
        return result.rows[0];
    } catch (error){
        console.log("Something went wrong!",error);
    }
}
export {createUser , getUserByEmail};