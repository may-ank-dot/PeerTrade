import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/listingRoutes.js";
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;  

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Cors to allow requests from the front-end
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))
app.use("/users",userRoutes);
app.use("/products",productRoutes);


app.listen(PORT,(err)=> {
    if(err) console.log(err);
    else{
        console.log(`listing on PORT ${PORT}`);
    }
})