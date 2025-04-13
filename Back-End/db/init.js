import db from "./connect.js";

const createTables = async () => {
    try{
        await db.query(`
            CREATE TABLE IF NOT EXISTS users(
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS listings(
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price FLOAT NOT NULL,
                category VARCHAR(100) NOT NULL,
                image_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );     
        `);
        await db.query(`ALTER TABLE listings ADD COLUMN user_id UUID REFERENCES users(id);`)
        console.log("Tables created succesfully!");
        } catch (error){
            console.error(error);
        } finally{
            db.end();
        }
};