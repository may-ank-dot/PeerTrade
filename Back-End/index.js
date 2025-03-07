import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;  

// Cors to allow requests from the front-end
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

app.get("/about", (req, res) => {
    res.send("hello world`");
});

app.listen(PORT,(err)=> {
    if(err) console.log(err);
    else{
        console.log(`listing on PORT ${PORT}`);
    }
})