import db from "../db/connect.js";

const createListings = async (
    title,
    description,
    listing_type,
    sell_price,
    rent_price,
    category,
    public_id,
    image_url,
    user_id
) => {
    try {
        const result = await db.query(
            `INSERT INTO listings (
                title, description, listing_type,
                sell_price, rent_price, category,
                public_id, image_url, user_id, created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
            RETURNING *`,
            [
                title,
                description,
                listing_type,
                sell_price,
                rent_price,
                category,
                public_id,
                image_url,
                user_id
            ]
        );
        return result.rows[0];
    } catch (error) {
        console.error("DB Insert Error:", error);
        throw error;
    }
};

const getAllListings = async () => {
    try {
        const result = await db.query("SELECT * FROM listings ORDER BY created_at DESC");
        return result.rows;
    } catch (error) {
        console.error("Get listing not working", error);
        throw error;
    }
};

const getListingByUserId = async (userId) => {
    try {
        const result = await db.query(`SELECT * FROM listings WHERE user_id = $1 ORDER BY created_at DESC`, [userId]);
        return result.rows;
    } catch (error) {
        console.error("Error Listing user by id", error);
        throw error;
    }
};

const getListingById = async (id) => {
    try {
        const result = await db.query("SELECT * FROM listings WHERE id = $1", [id]);
        return result;
    } catch (error) {
        console.error("Listing by id not working", error);
        throw error;
    }
};

// const updateListingById = async (id, title, description, price, category, image_url, public_id) => {
//     try {
//         let query;
//         let params;
        
//         // If public_id is provided, update it too
//         if (public_id) {
//             query = `
//                 UPDATE listings 
//                 SET title = $1, description = $2, price = $3, category = $4, image_url = $5, public_id = $6 
//                 WHERE id = $7 
//                 RETURNING *
//             `;
//             params = [title, description, price, category, image_url, public_id, id];
//         } else {
//             // Otherwise just update the other fields
//             query = `
//                 UPDATE listings 
//                 SET title = $1, description = $2, price = $3, category = $4, image_url = $5 
//                 WHERE id = $6 
//                 RETURNING *
//             `;
//             params = [title, description, price, category, image_url, id];
//         }
        
//         const result = await db.query(query, params);
        
//         if (result.rows.length === 0) {
//             throw new Error("Listing not found or update failed");
//         }
        
//         return result.rows[0];
//     } catch (error) {
//         console.error("Error while updating Listings", error);
//         throw error; // Re-throw so the controller can handle it
//     }
// };
const updateListingById = async (
    id,
    title,
    description,
    listing_type,
    sell_price,
    rent_price,
    category,
    image_url,
    public_id
) => {
    try {
        const query = `
            UPDATE listings 
            SET 
                title = $1,
                description = $2,
                listing_type = $3,
                sell_price = $4,
                rent_price = $5,
                category = $6,
                image_url = $7,
                public_id = $8
            WHERE id = $9
            RETURNING *
        `;
        const params = [
            title,
            description,
            listing_type,
            sell_price,
            rent_price,
            category,
            image_url,
            public_id,
            id
        ];

        const result = await db.query(query, params);

        if (result.rows.length === 0) {
            throw new Error("Listing not found or update failed");
        }

        return result.rows[0];
    } catch (error) {
        console.error("Error while updating Listings", error);
        throw error;
    }
};

const searchListings = async (query, category) => {
    try {
        let sql = "SELECT * FROM listings WHERE 1=1";
        const values = [];
        let index = 1;
        
        if (query) {
            sql += ` AND (title ILIKE $${index} OR description ILIKE $${index + 1})`;
            values.push(`%${query}%`, `%${query}%`);
            index += 2;
        }
        
        if (category) {
            sql += ` AND category = $${index}`;
            values.push(category);
            index += 1;
        }
        
        sql += " ORDER BY created_at DESC";
        
        const result = await db.query(sql, values);
        return result.rows;
    } catch (error) {
        console.error("Error while fetching data for search listing", error);
        throw error;
    }
};

const deleteListings = async (id) => {
    try {
        const result = await db.query("DELETE FROM listings WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error while deleting listing", error);
        throw error;
    }
};

export {
    createListings,
    searchListings,
    getAllListings,
    getListingById,
    deleteListings,
    updateListingById,
    getListingByUserId
};