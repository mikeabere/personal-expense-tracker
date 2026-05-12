import express from "express";
import connectDB from "./config/db.js";

const app = express();
connectDB();




const PORT = process.env.PORT || 7000 ;

app.listen( (PORT)=> {
    console.log(`server running on port ${PORT}`);
});