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
            CREATE TABLE listings (
            id UUID PRIMARY KEY NOT NULL,
            title VARCHAR NOT NULL,
            description TEXT NOT NULL,
            price DOUBLE PRECISION NOT NULL,
            category VARCHAR NOT NULL,
            image_url TEXT,
            public_id TEXT,
            user_id UUID NOT NULL,
            created_at TIMESTAMP,
            CONSTRAINT fk_user
              FOREIGN KEY (user_id)
              REFERENCES users(id)
              ON DELETE CASCADE
          );
 
        `);
        await db.query(
           `CREATE TABLE reports( 
	        id UUID PRIMARY KEY NOT NULL,
	        report_desc TEXT NOT NULL,
	        times_reported INT DEFAULT 0,
	        report_time TIMESTAMP,
	        user_id UUID NOT NULL,
	        listing_id UUID NOT NULL,
	        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	        CONSTRAINT fk_products FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
	        );` 
        )
        await db.query(`ALTER TABLE listings ADD COLUMN user_id UUID REFERENCES users(id);`)
        console.log("Tables created succesfully!");
        } catch (error){
            console.error(error);
        } finally{
            db.end();
        }
};