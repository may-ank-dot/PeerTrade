import express from 'express';
import cors from 'cors';
import db from "./db/connect.js";

const app = express();
const PORT = 3000;  

// Cors to allow requests from the front-end
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

app.get("/about",async (req, res) => {
    try{
        const val = await db.query("SELECT * FROM students");
        console.log(val.rows[0]);
    } catch(err){
        console.error(err);
    }
});

app.listen(PORT,(err)=> {
    if(err) console.log(err);
    else{
        console.log(`listing on PORT ${PORT}`);
    }
})