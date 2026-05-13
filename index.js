import dotenv from "dotenv"; //must import at the top
dotenv.config();
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";


const app = express();
connectDB();

if(process.env.NODE_ENV = "development"){
   app.use(morgan('dev'));
}


const PORT = process.env.PORT || 7000 ;

app.listen( (PORT)=> {
    console.log(`server running on port ${PORT}`);
});